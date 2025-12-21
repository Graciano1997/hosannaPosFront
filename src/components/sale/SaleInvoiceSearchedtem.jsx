import Money from "../general/Money";

const SaleInvoiceSearchedtem = ({product,index})=>{

    return(
        <div className={`grid grid-cols-[20fr_20fr_20fr_20fr_20fr] md:grid-cols-[10fr_10fr_10fr_10fr_10fr_25fr_10fr] place-items-center text-md ${index%2==0?'bg-green-50':'bg-green-100'} p-3 cursor-pointer`}>
                <p>{product.name}</p>
                <p><Money amount={product.price}/></p>
                <p className="hidden md:block">{product.discount}</p>
                <p className="hidden md:block">{product.taxes}</p>
                <div className="flex items-center"> 
                <p>{product.qty}</p>
               </div>
                <p><Money amount={product.subtotal}/></p>
        </div>
    );
};

export default SaleInvoiceSearchedtem;