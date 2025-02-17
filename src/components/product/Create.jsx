import { useState } from "react";
import Modal from "../general/Modal";
import { useDispatch, useSelector } from "react-redux";
import { registerProduct, updateProduct } from "../../slices/productSlice";
import LargeModal from "../general/LargeModal";

const Create = ({ setIsShowing }) => {
    const productState = useSelector((state) => state.productState);
    const [product, setProduct] = useState(productState.productToUpdate);
    const [dimensionVector,setDimensionVector]=useState({});
    const dispatch = useDispatch();

    const categories = useSelector((state) => state.categoryState.categories);
    const productFilterRows = useSelector((state)=>state.productState.productFilterRows)

    const formHandler = (el) => {
        setProduct({
            ...product,
            [el.target.name]: el.target.value
        })
    }

    const handleFormSubmition = (el) => {
        el.preventDefault();

        let treatedProductObject = {
            ...product,
            category_id: parseInt(product.category_id),
            dimension:JSON.stringify(dimensionVector) 
        }

         if (treatedProductObject.id) {
             dispatch(updateProduct(treatedProductObject));
         } else {
             dispatch(registerProduct(treatedProductObject));
         }
    }

    return (
        <>
            <LargeModal setIsShowing={setIsShowing}>
                <form onSubmit={handleFormSubmition} action="POST" className='flex flex-col h-[100%]  mt-[1rem] rounded p-3'>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-5">
                            <div className="w-[50%]">
                                <label>
                                    Nome
                                    <br />
                                    <input type='text' onChange={formHandler} name="name" value={product.name} className='p-1 rounded w-[100%] outline-none' />
                                </label>
                            </div>

                            <div className="w-[50%]">
                                <label>
                                    Preco de venda
                                    <br />
                                    <input type='number' onChange={formHandler} name="price" value={product.price} className='p-1 rounded w-[100%] outline-none' min={0} />
                                </label>
                            </div>

                            <div className="w-[50%]">
                                <label>
                                    Quantidade
                                    <br />
                                    <input type='number' onChange={formHandler} name="qty" value={product.qty} className='p-1 rounded w-[100%] outline-none' min={0} />
                                </label>
                            </div>
                        </div>

                        <div className="flex gap-5">


                            <div className="w-[50%]">
                                <label>
                                    Bar Code
                                    <br />
                                    <input type='text' name="code" onChange={formHandler} value={product.code} className='p-1 rounded w-[100%] outline-none' />
                                </label>
                            </div>

                            <div className="w-[50%]">
                                <label>
                                    Category
                                    <br />
                                    <select name="category_id" value={product.category_id} onChange={formHandler} className='p-2 rounded w-[100%] outline-none'>
                                        <option value="" disabled selected>Selecione uma categoria</option>
                                        {categories.map((category) => <option value={category.id}>{category.name}</option>)}
                                    </select>
                                </label>
                            </div>
                        {!productFilterRows.includes('product_type') &&
                            <div className="w-[50%]">
                                <label>
                                    Tipo de Produto
                                    <br />
                                    <select name="product_type" value={product.product_type} onChange={formHandler} className='p-2 rounded w-[100%] outline-none'>
                                        <option value="" disabled selected>Selecione o tipo de produto </option>
                                        <option value="good">Good</option>
                                        <option value="service">Service</option>
                                    </select>
                                </label>
                            </div>
                        }
                        </div>

                        <div className="flex gap-5">
                        {!productFilterRows.includes('taxes') &&
                     
                            <div className="w-[50%]">
                                <label>
                                    Imposto do produto
                                    <br />
                                    <input type='number' onChange={formHandler} name="taxes" value={product.taxes} className='p-1 rounded w-[100%] outline-none' />
                                </label>
                            </div>
                        }

{!productFilterRows.includes('status') &&

                            <div className="w-[50%]">
                                <label>
                                    Status
                                    <br />
                                    <select name="status" value={product.status} onChange={formHandler} className='p-2 rounded w-[100%] outline-none'>
                                        <option value="" disabled selected>Estado do produto</option>
                                        <option value={true}>Activo</option>
                                        <option value={true}>Desativo</option>
                                    </select>
                                </label>
                            </div>
}

{!productFilterRows.includes('brand') &&

                            <div className="w-[50%]">
                                <label>
                                    Marca
                                    <br />
                                    <input type='text' onChange={formHandler} name="brand" value={product.brand} className='p-1 rounded w-[100%] outline-none' />
                                </label>
                            </div>
                            }

                        </div>

                        <div className="flex gap-5">
                        {!productFilterRows.includes('cost_price') &&

                            <div className="w-[50%]">
                                <label>
                                    Preco de Custo
                                    <br />
                                    <input type='number' onChange={formHandler} name="cost_price" value={product.cost_price} className='p-1 rounded w-[100%] outline-none' />
                                </label>
                            </div>
                        }
                    {!productFilterRows.includes('promotion') &&
                            <div className="w-[50%]">
                                <label>
                                    Promocao
                                    <br />
                                    <select name="promotion" value={product.promotion} onChange={formHandler} className='p-2 rounded w-[100%] outline-none'>
                                        <option value="" disabled selected>Produto em promocao </option>
                                        <option value={true}>Sim</option>
                                        <option value={true}>Nao</option>

                                    </select>
                                </label>
                            </div>
}

{!productFilterRows.includes('discount') &&
                            <div className="w-[50%]">
                                <label>
                                    Discount
                                    <br />
                                    <input type='number' onChange={formHandler} name="discount" value={product.discount} className='p-1 rounded w-[100%] outline-none' min={0} />
                                </label>
                            </div>
}
                        </div>

                        <div className="flex gap-5">
                        {!productFilterRows.includes('weight') &&
                            <div className="w-[50%]">
                                <label>
                                    Peso
                                    <br />
                                    <input type='number' onChange={formHandler} name="weight" value={product.weight} className='p-1 rounded w-[100%] outline-none' />
                                </label>
                            </div>
}
{!productFilterRows.includes('mesure_unit') &&
                            <div className="w-[50%]">
                                <label>
                                    Unidade de medida
                                    <br />
                                    <select name="mesure_unit" value={product.mesure_unit} onChange={formHandler} className='p-2 rounded w-[100%] outline-none'>
                                        <option value="" disabled selected>Selecione a unidade </option>
                                        <option value="kg">kilograma (kg)</option>
                                        <option value="un">unidade (un)</option>
                                        <option value="l">litros (l)</option>
                                    </select>
                                </label>
                            </div>
}


{!productFilterRows.includes('dimension') &&

                            <div className="w-[50%]">
                                <label>
                                    Dimensoes
                                    <br />
                                    <div className="flex gap-1 w-[100%]">
                                        <input type='number' onChange={(el)=>{
                                            
                                            setDimensionVector({...dimensionVector,
                                                w:el.target.value*1
                                            });

                                            setProduct({
                                                ...product,
                                                dimension: dimensionVector
                                            })

                                        }} placeholder="Largura" value={dimensionVector.w} className='p-1 rounded w-[33%] outline-none' min={0} />
                                        <input type='number' 
                                        onChange={(el)=>{
                                            
                                            setDimensionVector({...dimensionVector,
                                                h:el.target.value*1
                                            });

                                        }}
                                        placeholder="Altura" name="discount" value={dimensionVector.h} className='p-1 rounded w-[33%] outline-none' min={0} />
                                        <input type='number' onChange={(el)=>{
                                            
                                            setDimensionVector({...dimensionVector,
                                                d:el.target.value*1
                                            });
                                        }} placeholder="Profundidade"value={dimensionVector.d} className='p-1 rounded w-[33%] outline-none' min={0} />
                                        <input type='hidden' name='dimension' value={dimensionVector}/>                                
                                    </div>
                                </label>
                            </div>
}
                        </div>


                        <div className="flex gap-5">
{!productFilterRows.includes('manufacture_date') &&
                            <div className="w-[50%]">
                                <label>
                                    Manufacture Date
                                    <br />
                                    <input type='date' name="manufacture_date" onChange={formHandler} value={product.manufacture_date} className='p-1 rounded w-[100%] outline-none' />
                                </label>
                            </div>
}

{!productFilterRows.includes('expire_date') &&
                            <div className="w-[50%]">
                                <label>
                                    Expire Date
                                    <br />
                                    <input type='date' name="expire_date" onChange={formHandler} value={product.expire_date} className='p-1 rounded w-[100%] outline-none' />
                                </label>
                            </div>
}

{!productFilterRows.includes('location_in_stock') &&

                            <div className="w-[50%]">
                                <label>
                                    Localizacao no Stock
                                    <br />
                                    <input type='text' name="location_in_stock" onChange={formHandler} value={product.location_in_stock} className='p-1 rounded w-[100%] outline-none' />
                                </label>
                            </div>
}
                        </div>

                        <div className="flex gap-5">
                        {!productFilterRows.includes('description') &&
                        
                            <div className="w-[50%]">
                                <label>
                                    Descricao
                                    <br />
                                    <textarea name="description" value={product.description} onChange={formHandler} className='p-2 rounded w-[100%] outline-none h-[70px]'>
                                    </textarea>
                                </label>
                            </div>
}

{!productFilterRows.includes('observation') &&

                            <div className="w-[50%]">
                                <label>
                                    Observation
                                    <br />
                                    <textarea name="observation" onChange={formHandler} value={product.observation} className='p-2 h-[70px] rounded w-[100%] outline-none'>
                                    </textarea>
                                </label>
                            </div>
}
{!productFilterRows.includes('keyword') &&

                            <div className="w-[50%]">
                                <label>
                                    Palavra chave do produto
                                    <br />
                                    <input type='text' onChange={formHandler} name="keyword" value={product.keyword} className='p-1 rounded w-[100%] outline-none' />
                                </label>
                            </div>
}
                        </div>
                    </div>
                    <div className="flex justify-end p-2 mt-auto"><button className="p-2 bg-green-100 rounded">{product.id ? 'Update' : 'Create'}</button></div>
                </form>
            </LargeModal>
        </>
    );
};

export default Create;