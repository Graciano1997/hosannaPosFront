const ClientDetails = ()=>{
    return(
        <div className={`h-[500px] bg-white rounded shadow-md p-3 flex flex-col  gap-2`}>
            <h1 className="font-bold mt-5">* Client Details</h1>
            <div className="flex flex-col gap-3">
                <label for="clienteNome">Nome</label>
                <input type="text" id="clienteNome" className="bg-green-100 rounded p-2"></input>
            </div>

            <div className="flex flex-col gap-3">
                <label for="clienteContact">Tel.Numero</label>
                <input type="number" id="clienteContact" className="bg-green-100 rounded p-2"></input>
            </div>

            <div className="flex flex-col gap-3">
                <label for="clienteType">Metodo de pagamento</label>
                <select id="clienteType" className="bg-green-100 rounded p-2">
                    <option value="1">Dinheiro</option>
                    <option value="2">Tpa</option>
                    <option value="2">Transferencia</option>
                    <option value="2">Misto</option>
                </select>
            </div>

            <div className="flex flex-col gap-3">
                <label for="clienteType">Tipo de Cliente</label>
                <select id="clienteType" className="bg-green-100 rounded p-2">
                    <option value="1">Empresa</option>
                    <option value="2">Singular</option>
                </select>
            </div>
            <div className="flex flex-col gap-3">
                <label for="clienteContact">NIF</label>
                <input type="number" id="clienteContact" className="bg-green-100 rounded p-2"></input>
            </div>
            
        </div>
    );
};

export default ClientDetails;