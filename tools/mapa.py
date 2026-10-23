"""Modelo 3D low-poly de SLP en 4 regiones. Fuente: INEGI Marco Geoestadístico 2023 (vía github.com/PhantomInsights/mexico-geojson).
# Descargar el GeoJSON: https://raw.githubusercontent.com/PhantomInsights/mexico-geojson/main/2023/states/San%20Luis%20Potos%C3%AD.json
Agrupación municipal: Regiones de San Luis Potosí (es.wikipedia.org/wiki/Regiones_de_San_Luis_Potosí; SEDECO SLP)."""
import json,trimesh,numpy as np
from shapely.geometry import shape
from shapely.ops import unary_union
from shapely import affinity
R={'altiplano':['006','007','015','017','020','022','025','033','044','045','047','048','049','051','056'],
 'centro':['001','004','009','021','028','032','035','043','046','050','055'],
 'media':['002','005','008','010','011','019','023','024','027','030','031','052'],
 'huasteca':['003','012','013','014','016','018','026','029','034','036','037','038','039','040','041','042','053','054','057','058']}
COL={'altiplano':[0.85,0.62,0.30,1],'centro':[0.55,0.70,0.35,1],'media':[0.30,0.62,0.55,1],'huasteca':[0.13,0.55,0.25,1]}
d=json.load(open('/workspace/cn/m.json'))
g={f['properties']['CVE_MUN']:shape(f['geometry']).buffer(0) for f in d['features']}
assert sum(map(len,R.values()))==58
allp=unary_union(list(g.values())); minx,miny,maxx,maxy=allp.bounds; cx,cy=(minx+maxx)/2,(miny+maxy)/2
k=np.cos(np.radians(cy)); s=1/((maxx-minx)*k)  # ancho total = 1
sc=trimesh.Scene(); info={}
for r,ms in R.items():
    p=unary_union([g[m] for m in ms]).buffer(0.004).buffer(-0.004).simplify(0.02)
    pass
    p=affinity.affine_transform(p,[k*s,0,0,s,-cx*k*s,-cy*s])
    polys=list(p.geoms) if p.geom_type=='MultiPolygon' else [p]
    ms_=[trimesh.creation.extrude_polygon(q,0.04) for q in polys if q.area>1e-4]
    m=trimesh.util.concatenate(ms_); m.apply_transform(trimesh.transformations.rotation_matrix(-np.pi/2,[1,0,0]))
    m.visual=trimesh.visual.ColorVisuals(m,face_colors=(np.array(COL[r])*255).astype(np.uint8))
    sc.add_geometry(m,node_name=r,geom_name=r)
    c=p.representative_point(); info[r]={'x':round(c.x,3),'z':round(-c.y,3),'bounds':[round(v,3) for v in p.bounds]}
    print(r,len(m.faces))
from trimesh.exchange.gltf import export_gltf
out=export_gltf(sc,embed_buffers=True); open('models/slp_regiones.gltf','wb').write(out['model.gltf'])
json.dump(info,open('data/regiones_geo.json','w'),indent=1); print(info)
# ranuras para pines: puntos de rejilla dentro de cada región (coordenadas locales x,z)
from shapely.geometry import Point
slots={}
for r,ms in R.items():
    p=unary_union([g[m] for m in ms]).buffer(0.004).buffer(-0.004).simplify(0.02)
    p=affinity.affine_transform(p,[k*s,0,0,s,-cx*k*s,-cy*s]).buffer(-0.025)
    c=p.representative_point(); pts=[]
    for st in (0.06,0.055,0.05,0.045,0.04,0.035):
     pts=[]
     for i in range(-15,16):
        for j in range(-15,16):
            q=Point(c.x+i*st,c.y+j*st)
            if p.contains(q): pts.append((round(q.x,3),round(-q.y,3),(i*i+j*j)))
     if len(pts)>=15: break
    pts.sort(key=lambda t:t[2]); slots[r]=[[a,b] for a,b,_ in pts[:16]]; print(r,len(pts))
json.dump({'regiones':info,'pines':slots},open('data/regiones_geo.json','w'))
