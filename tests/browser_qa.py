"""Behavior and visual QA. Install: python -m pip install playwright; python -m playwright install chromium.
Run against dev/preview: python tests/browser_qa.py --url http://127.0.0.1:5187
"""
import argparse
import json
import sys
from pathlib import Path
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright, expect
sys.stdout.reconfigure(encoding="utf-8")
parser=argparse.ArgumentParser()
parser.add_argument("--url",default="http://127.0.0.1:5187")
args=parser.parse_args()
BASE=args.url.rstrip("/")
OUT=Path("artifacts/qa");OUT.mkdir(parents=True,exist_ok=True)
reports=[]
def ready(page):
    page.wait_for_load_state("networkidle")
    page.evaluate("document.fonts.ready")
def shot(page, filename):
    page.evaluate("""async () => {
      const top=window.scrollY;
      for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,35));}
      await Promise.all([...document.images].map(im=>im.decode().catch(()=>{})));
      document.activeElement?.blur();
      window.scrollTo(0,0);
      await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
    }""")
    page.screenshot(path=str(OUT/filename),full_page=True)
def clean(page):
    assert page.evaluate("document.documentElement.scrollWidth <= window.innerWidth"),"Horizontal overflow"
    broken=page.locator("img").evaluate_all("(images)=>images.filter(i=>i.complete && !i.naturalWidth).map(i=>i.src)")
    assert not broken,broken
    assert "Lumi" not in page.locator("body").inner_text(),"Upstream branding in interface"
with sync_playwright() as pw:
    browser=pw.chromium.launch(headless=True)
    for label,width,height in [("desktop",1440,1000),("mobile",390,844)]:
        context=browser.new_context(viewport={"width":width,"height":height},device_scale_factor=1,is_mobile=width<640,has_touch=width<640)
        page=context.new_page()
        errors=[];external=[];writes=[];failed_requests=[]
        page.on("pageerror",lambda err:errors.append(str(err)))
        page.on("requestfailed",lambda req:failed_requests.append({"url":req.url,"failure":req.failure}))
        page.on("console",lambda msg:errors.append(msg.text) if msg.type=="error" else None)
        page.on("request",lambda req:external.append(req.url) if urlparse(req.url).netloc!=urlparse(BASE).netloc else None)
        page.on("request",lambda req:writes.append(req.url) if req.method!="GET" else None)
        page.goto(BASE);ready(page)
        expect(page.get_by_role("heading",level=1)).to_contain_text("O seu brilho")
        shot(page,label+"-home.png");clean(page)
        # Menu/header search and genuine navigation.
        if width<640:
            page.get_by_role("button",name="Abrir menu",exact=True).click()
            expect(page.locator("#main-navigation")).to_be_visible()
            page.locator("#main-navigation").get_by_role("link",name="Anéis",exact=True).click()
            expect(page.get_by_role("heading",level=1)).to_have_text("Anéis")
            expect(page.locator(".productCard")).to_have_count(3)
            expect(page.locator("#main-navigation")).not_to_be_visible()
        page.get_by_role("button",name="Abrir busca",exact=True).click()
        page.get_by_label("Buscar peças",exact=True).fill("aneis")
        page.locator("#header-search").get_by_role("button",name="Buscar",exact=True).click()
        expect(page.locator(".productCard")).to_have_count(3)
        page.get_by_label("Buscar no catálogo").fill("inexistente")
        expect(page.locator(".productCard")).to_have_count(0)
        page.get_by_role("button",name="Limpar busca e filtros").click()
        expect(page.locator(".productCard")).to_have_count(12)
        # Categories, combined collection/price filters and ordering.
        page.locator(".categoryChips").get_by_role("link",name="Anéis",exact=True).click()
        expect(page.locator(".productCard")).to_have_count(3)
        if width<640:page.get_by_role("button",name="Filtros",exact=True).click()
        page.get_by_label("Coleção demonstrativa").select_option("Luz")
        expect(page.locator(".productCard")).to_have_count(1)
        page.get_by_label("Preço máximo",exact=True).fill("6000")
        expect(page.locator(".productCard")).to_have_count(0)
        page.locator("#catalog-filters").get_by_role("button",name="Limpar filtros").click()
        expect(page.locator(".productCard")).to_have_count(3)
        page.locator(".categoryChips").get_by_role("link",name="Todas",exact=True).click()
        page.get_by_label("Ordenar peças").select_option("preco-desc")
        expect(page.locator(".productCard").first.locator(".productName")).to_have_text("Colar Gota")
        shot(page,label+"-catalog.png");clean(page)
        # Favorites persist after reload.
        page.get_by_role("button",name="Salvar Argola Textura nos favoritos",exact=True).click()
        page.goto(BASE+"/#/favoritos");ready(page)
        expect(page.locator(".productCard")).to_have_count(1)
        page.reload();ready(page);expect(page.locator(".productCard")).to_have_count(1)
        shot(page,label+"-favorites.png");clean(page)
        # Direct product links, gallery/zoom, size validation.
        page.goto(BASE+"/#/produto/argola-textura");ready(page)
        expect(page.get_by_role("heading",level=1)).to_have_text("Argola Textura")
        page.get_by_role("button",name="Ver detalhe",exact=True).click()
        expect(page.locator(".mainProductImage")).to_have_class("mainProductImage detailView")
        page.get_by_role("button",name="Ver peça",exact=True).click()
        page.get_by_role("button",name="Ampliar fotografia de Argola Textura",exact=True).click()
        expect(page.get_by_role("dialog")).to_be_visible()
        page.keyboard.press("Escape")
        expect(page.get_by_role("dialog")).not_to_be_visible()
        shot(page,label+"-product.png");clean(page)
        page.get_by_role("button",name="Aumentar quantidade",exact=True).click()
        page.get_by_role("button",name="Adicionar ao carrinho",exact=True).click()
        expect(page.locator(".addedNotice")).to_be_visible()
        page.goto(BASE+"/#/produto/anel-luz");ready(page)
        page.get_by_role("button",name="Adicionar ao carrinho",exact=True).click()
        expect(page.locator("#variation-error")).to_be_visible()
        page.get_by_role("radio",name="14",exact=True).check()
        page.get_by_role("button",name="Adicionar ao carrinho",exact=True).click()
        page.get_by_role("radio",name="16",exact=True).check()
        page.get_by_role("button",name="Adicionar ao carrinho",exact=True).click()
        shot(page,label+"-ring-product.png")
        page.goto(BASE+"/#/carrinho");ready(page)
        expect(page.locator(".cartLine")).to_have_count(3)
        expect(page.locator(".summaryTotal strong")).to_have_text("R$ 316,00")
        page.get_by_role("button",name="Aumentar quantidade de Argola Textura",exact=True).click()
        expect(page.locator(".summaryTotal strong")).to_have_text("R$ 405,00")
        page.reload();ready(page)
        expect(page.locator(".summaryTotal strong")).to_have_text("R$ 405,00")
        line=page.locator(".cartLine").filter(has_text="Aro 14")
        line.get_by_role("button",name="Remover",exact=True).click()
        expect(page.locator(".cartLine")).to_have_count(2)
        expect(page.locator(".summaryTotal strong")).to_have_text("R$ 336,00")
        page.get_by_role("button",name="Diminuir quantidade de Argola Textura",exact=True).click()
        expect(page.locator(".summaryTotal strong")).to_have_text("R$ 247,00")
        shot(page,label+"-cart.png");clean(page)
        # Checkout: native validation blocks, successful simulation causes no writes.
        page.get_by_role("link",name="Continuar para simulação",exact=True).click()
        expect(page.get_by_role("heading",level=1)).to_have_text("Vamos simular?")
        page.get_by_role("button",name="Concluir simulação",exact=True).click()
        expect(page.get_by_role("dialog")).not_to_be_visible()
        values={"nome":"Maria de Exemplo","email":"maria@exemplo.com","telefone":"(42) 99999-0000","cep":"85000-000","rua":"Rua de Exemplo","numero":"123","bairro":"Centro","cidade":"Guarapuava"}
        for key,value in values.items():page.locator("[name='"+key+"']").fill(value)
        page.locator("[name=estado]").select_option("PR")
        page.locator("[name=telefone]").fill("invalidphone")
        assert not page.locator("[name=telefone]").evaluate("(el)=>el.checkValidity()")
        page.locator("[name=telefone]").fill("(42) 99999-0000")
        assert page.locator("form").evaluate("(form)=>form.checkValidity()"),page.locator("form :invalid").evaluate_all("(els)=>els.map(e=>[e.name,e.validationMessage])")
        shot(page,label+"-checkout.png");clean(page)
        before=page.evaluate("JSON.stringify({...localStorage})")
        page.get_by_role("button",name="Concluir simulação",exact=True).click()
        expect(page.get_by_role("dialog",name="Simulação concluída")).to_be_visible()
        after=page.evaluate("JSON.stringify({...localStorage})")
        assert before==after,"Checkout must not persist personal details"
        assert "maria@exemplo" not in after
        shot(page,label+"-confirmation.png")
        page.get_by_role("button",name="Revisar a simulação").click()
        expect(page.get_by_role("dialog")).not_to_be_visible()
        # Direct-link reloads and all additional routes.
        for path,heading in [("/marca","A beleza de"),("/sobre-a-demo","Imagine a Irene online."),("/produto/colar-gota","Colar Gota"),("/favoritos","Meus favoritos"),("/catalogo","Todas as peças"),("/nao-existe","Vamos encontrar o seu brilho?")]:
            page.goto(BASE+"/#"+path);ready(page);page.reload();ready(page)
            expect(page.get_by_role("heading",level=1)).to_contain_text(heading);clean(page)
        # External contacts are links only and use confirmed address/phone.
        assert page.locator("a[href='https://www.instagram.com/irene.semijoias_/']").count()>=1
        assert page.locator("a[href='https://wa.me/5542999992166']").count()>=1
        # Corrupted storage and empty states.
        page.evaluate("localStorage.setItem('irene_semijoias_demo_v1','{broken')")
        page.goto(BASE+"/#/carrinho");page.reload();ready(page)
        expect(page.locator(".cartLine")).to_have_count(0)
        expect(page.locator(".emptyState")).to_be_visible()
        page.goto(BASE+"/#/favoritos");ready(page)
        expect(page.locator(".emptyState")).to_be_visible()
        assert not errors,{"errors":errors,"failed_requests":failed_requests}
        assert not external,external
        assert not writes,writes
        reports.append({"viewport":label,"width":width,"passed":True,"console_errors":errors,"external_requests":external,"non_get_requests":writes,"scenarios":["navigation","search","categories","combined_filters","sorting","favorites_persistence","gallery_and_zoom","ring_size_validation","cart_variants_quantities_remove_totals_persistence","checkout_validation_simulation_no_persistence","direct_routes_reload","empty_states","corrupt_localStorage","responsive_overflow","image_loading","contacts"]})
        print("PASS",label,"all functional flows")
        context.close()
    # Small-screen layout coverage.
    page=browser.new_page(viewport={"width":320,"height":740})
    for path in ["/","/catalogo","/produto/anel-elos","/checkout","/carrinho","/favoritos","/marca","/sobre-a-demo"]:
        page.goto(BASE+"/#"+path);ready(page);clean(page)
    reports.append({"viewport":"small_mobile","width":320,"passed":True,"scenarios":["responsive_layout_all_routes"]})
    print("PASS small_mobile 320px")
    browser.close()
(OUT/"report.json").write_text(json.dumps(reports,indent=2,ensure_ascii=False),encoding="utf-8")
print("All browser QA passed. Report:",OUT/"report.json")
