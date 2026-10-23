"""Recorta las cartas del Memorama Conexión Natural (Memorama_Conexion_Natural_FINAL.pdf, sin alterar; solo escala) -> js/cartas.js"""
from PIL import Image;import io,base64,json
X=[22,1297];Y=[22,847,1672,2497];W,H=596,792
out={}
def b64(im):
    im=im.resize((300,399),Image.LANCZOS);b=io.BytesIO();im.save(b,'JPEG',quality=82);return 'data:image/jpeg;base64,'+base64.b64encode(b.getvalue()).decode()
n=0
for p in range(4):
    pg=Image.open('/workspace/cn/pg-%03d.jpg'%p).convert('RGB')
    for y in Y:
        for x in X:
            if p==3 and y==2497: continue
            out['c%02d'%n]=b64(pg.crop((x,y,x+W,y+H)));n+=1
out['reverso']=b64(Image.open('/workspace/cn/pg-004.jpg').convert('RGB').crop((22,22,22+W,22+H)))
open('js/cartas.js','w').write('/* Cartas del Memorama "Conexión Natural" (Agenda Ambiental UASLP), recortadas sin alterar de Memorama_Conexion_Natural_FINAL.pdf (solo escala). */\nwindow.CARTAS='+json.dumps(out)+';\n')
print(n)
