import { useSelector } from "react-redux";

const SearchedProducts = ()=>{
    
    const searchedProducts = useSelector((state)=>state.productState.productsSearched);

    return(
        <div className="flex flex-col gap-3 mt-[2rem] p-3">
            {searchedProducts.length>0 &&(
            <>
            <h1 className="text-xl font-bold">Produtos Encontrados</h1>
             <div className="grid grid-cols-5 p-1 text-black font-bold">
                    <p>Name</p>
                    <p>Price</p>
                    <p>Available</p>
                    <p>Quantity</p>
                    <p></p>
            </div>
            <div className="h-[250px] flex flex-col gap-1" style={{overflow:'scroll'}}>
            {searchedProducts.map(product=>
                <div className="grid grid-cols-5 bg-green-200 p-1">
                    <p>
                    {product.name}
                    </p>
                    <p>
                     {product.price}
                    </p>
                    <p>
                     {product.available}
                    </p>
                    <div className="">
                        <input className="w-[70%] text-center p-1 rounded" type="number" min={1} defaultValue={1} name="" id="" placeholder="quantity" />
                    </div>
                     <button className="bg-green-500 text-white font-bold rounded">Add</button>
                </div>
            )
            }
            </div>
            </>

                )
            }
        
            {searchedProducts.length==0 && <h1 className="text-xl font-bold">Nenhum Producto foi encontrado</h1>}
        </div>
    )
};

export default SearchedProducts;