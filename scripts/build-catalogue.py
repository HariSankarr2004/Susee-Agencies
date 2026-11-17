from pathlib import Path
import json, re, shutil
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader
from reportlab.platypus import Paragraph, Table, TableStyle
from reportlab.lib.styles import ParagraphStyle
from xml.sax.saxutils import escape
import pymupdf as fitz

ROOT = Path(__file__).resolve().parents[1]
products = json.loads((ROOT/'tmp/pdfs/products.json').read_text(encoding='utf-8'))
OUT = ROOT/'output/pdf/susee-agencies-catalogue.pdf'
W,H = 595.28,841.89
GREEN='#19392d'; GOLD='#a68b53'; INK='#233e32'; MUTED='#626c60'; PAPER='#faf8f1'
c=canvas.Canvas(str(OUT),pagesize=(W,H))
c.setTitle('Susee Agencies | Product Catalogue')
c.setAuthor('Susee Agencies')

def text(x,y,value,size=10,color=INK,font='Helvetica'):
    c.setFillColor(HexColor(color));c.setFont(font,size);c.drawString(x,y,value)

def para(value,x,y,width,size=10,color=INK,font='Helvetica',leading=None):
    value=re.sub('[\u2010-\u2015]','-',value).replace('\u00a0',' ')
    p=Paragraph(escape(value),ParagraphStyle('body',fontName=font,fontSize=size,leading=leading or size*1.5,textColor=HexColor(color)))
    _,h=p.wrap(width,H);p.drawOn(c,x,y-h);return y-h

def bg():
    c.setFillColor(HexColor(PAPER));c.rect(0,0,W,H,fill=1,stroke=0)

def footer(page):
    c.setStrokeColor(HexColor('#d9d1bd'));c.line(40,58,W-40,58)
    text(40,40,'SUSEE AGENCIES  /  SUPPLY ACROSS TAMIL NADU',7,MUTED)
    text(W-65,40,f'{page:02}',8,GOLD)

def photo(path,x,y,w,h):
    c.drawImage(ImageReader(str(path)),x,y,width=w,height=h,preserveAspectRatio=True,anchor='c',mask='auto')

bg()
text(40,790,'SUSEE AGENCIES',16,GREEN,'Times-Bold')
text(40,763,'MEDICAL TEXTILES & ESSENTIALS',8,GOLD)
text(40,688,'The essentials',43,GREEN,'Times-Roman')
text(40,638,'behind everyday care.',36,GREEN,'Times-Italic')
text(40,603,'PRODUCT CATALOGUE',9,GOLD)
photo(ROOT/'public/assets/susee-gauze-hero.png',40,305,W-80,270)
para('Medical gauze, bandages, surgical cotton and hospital disposables. Supply to every city and town across Tamil Nadu.',40,282,W-80,12)
text(40,202,'Explore the collection',14,GREEN,'Times-Roman')
text(40,176,'Gauze & Bandage  /  Surgical Cotton  /  Hospital Wear & Disposables',9,MUTED)
text(40,139,'Call / WhatsApp: +91 93457 82296',11,GREEN)
text(40,119,'suseeagencies2004@gmail.com',10,MUTED)
c.linkURL('https://wa.me/919345782296',(40,130,300,150),relative=0)
footer(1);c.showPage()

for i,p in enumerate(products,2):
    bg();text(40,796,'SUSEE AGENCIES',11,GREEN,'Times-Bold');text(40,775,p['category'].upper(),8,GOLD)
    y=para(p['name'],40,745,W-80,27,GREEN,'Times-Roman',31)
    photo(ROOT/'public/assets'/p['image'],40,y-185,190,165)
    sy=para(p['summary'],250,y-25,305,11)
    sy=para('AVAILABLE SIZES',250,sy-18,305,8,GOLD)
    para(' | '.join(p['sizes']),250,sy-8,305,9)
    y=y-209
    text(40,y,'Product specifications',16,GREEN,'Times-Roman');y-=18
    style=ParagraphStyle('cell',fontName='Helvetica',fontSize=9,leading=13,textColor=HexColor(INK))
    rows=[[Paragraph(escape(spec['label']),style),Paragraph(escape(re.sub('[\u2010-\u2015]','-',spec['value'])),style)] for spec in p['specifications']]
    t=Table(rows,colWidths=[130,W-210])
    t.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),10),('RIGHTPADDING',(0,0),(-1,-1),10),('TOPPADDING',(0,0),(-1,-1),8),('BOTTOMPADDING',(0,0),(-1,-1),8),('ROWBACKGROUNDS',(0,0),(-1,-1),[HexColor('#eeeee4'),HexColor(PAPER)]),('LINEBELOW',(0,0),(-1,-1),.4,HexColor('#d9d1bd'))]))
    _,th=t.wrap(W-80,H);t.drawOn(c,40,y-th);y-=th+23
    y=para('APPLICATIONS  /  '+' | '.join(p['applications']),40,y,W-80,9,MUTED)
    assert y>134, (p['name'],y)
    para('Confirm required sizes, packing, availability and product suitability with our team when ordering.',40,117,W-80,8,MUTED)
    text(40,78,'ENQUIRE  +91 93457 82296  |  suseeagencies2004@gmail.com',9,GREEN)
    c.linkURL('https://wa.me/919345782296',(40,70,W-40,94),relative=0)
    footer(i);c.showPage()
c.save()
shutil.copyfile(OUT,ROOT/'public/catalogue'/OUT.name)
doc=fitz.open(OUT)
assert len(doc)==len(products)+1
for i,page in enumerate(doc):
    page.get_pixmap(matrix=fitz.Matrix(1,1)).save(str(ROOT/f'tmp/pdfs/page-{i+1:02}.png'))
    if i: assert products[i-1]['name'] in page.get_text()
print(f'Created and rendered {len(doc)} pages: {OUT}')

