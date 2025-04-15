import './pdfStyle.css'

const Pdf=()=>{    
    return(
        <>
        <div id="conteudowrapper">
        <div id="conteudo">
      <h1>MARIANO TCHIPOIA DOMINGOS</h1>
      <h2>Comércio Geral, Importação & Exportação</h2>
      <h3>Vende-se todos tipos de peças Genuinas de automóveis</h3>
      <p>MARIANO TCHIPOIA DOMINGOS</p>
      <p class="p001">Endereço: Município de Viana, Via Expressa, Bairro Km-25</p>
      <p class="p001">NIF: 000910091MO038</p>
      <p class="p001">Telefone: 953 577 264</p>
      <p class="p001">Telefone: 943 737 686</p>
      <p class="p001">Email: marianotchipoia@gmail.com</p>
      <p class="p002">Luanda - Angola</p>
      <p class="p002 mrg01">FTM AGT2025/945</p>
      <p class="p001">
        <label class="p001-label">Ref: 00000</label>
        <label class="p001-label">Forma de pagamento: Nemerário</label>
        <label class="p001-label">Operador: padrão</label>
        <label class="p001-label">Data da Faturação: 00/00/0000</label>
      </p>
      {/*  sale items */}

        <p class="p001" id="p001">
        <label class="p001-label" id="lb01">Produto</label>
        <label class="p001-label">Preço Unit.</label>
        <label class="p001-label">Qtd</label>
        <label class="p001-label">Un.</label>
        <label class="p001-label">Desc.</label>
        <label class="p001-label">Taxa</label>
        <label class="p001-label">Retenção</label>
        <label class="p001-label">Total</label>
      </p>

      <div id='itens'>

      </div>

      <div class="footer">

        <p class="p001 flp002">
          <label class="p001-label plabel001">COORDENADAS BANCÁRIAS</label>
          <label class="p001-label plabel001">BANCO BFA</label>
          <label class="p001-label plabel001">IBAN: AO06 0006 0000 0378 2266 3052 5</label>
        </p>

        <p class="p001 flp01" id='detalhes'>
          
        </p>
      </div>
      <div class="line01">Software HozSellsPoint</div>   
    </div>
        </div>

        </>
    )
};

export default Pdf;