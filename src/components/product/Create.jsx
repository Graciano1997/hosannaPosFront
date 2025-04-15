import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerProduct, updateProduct } from "../../slices/productSlice";
import LargeModal from "../general/LargeModal";
import { useTranslation } from "react-i18next";
import { firstCapitalize } from "../../lib/firstCapitalize";

const Create = ({ stopCreating }) => {
    const productState = useSelector((state) => state.productState);
    const [product, setProduct] = useState(productState.productToUpdate);
    const [dimensionVector, setDimensionVector] = useState({});
    const dispatch = useDispatch();
    const {t}=useTranslation();

    const categories = useSelector((state) => state.categoryState.categories);
    const productFilterRows = useSelector((state) => state.productState.productFilterRows)

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
            dimension: JSON.stringify(dimensionVector)
        }

         if (treatedProductObject.id) {
             dispatch(updateProduct(treatedProductObject));
         } else {
             dispatch(registerProduct(treatedProductObject));
         }
    }

    return (
        <>
            <LargeModal stopCreating={stopCreating}>
                <form  className='flex flex-col h-[100%]  mt-[1rem] rounded p-3'>
                    <div className="grid grid-cols-3 gap-4">
                        <label>
                        {firstCapitalize(t('name'))}
                            <br />
                            <input type='text' onChange={formHandler} name="name" value={product.name} className='p-1 rounded w-[100%] outline-none' />
                        </label>

                        <label>
                        {firstCapitalize(t('price'))}
                            <br />
                            <input type='number' onChange={formHandler} name="price" value={product.price} className='p-1 rounded w-[100%] outline-none' min={0} />
                        </label>

                        <label>
                        {firstCapitalize(t('qty'))}
                            <br />
                            <input type='number' onChange={formHandler} name="qty" value={product.qty} className='p-1 rounded w-[100%] outline-none' min={0} />
                        </label>


                        <label>
                        {firstCapitalize(t('code'))}
                            <br />
                            <input type='text' name="code" onChange={formHandler} value={product.code} className='p-1 rounded w-[100%] outline-none' />
                        </label>

                        {!productFilterRows.includes('lote') &&
                        <label>
                        {firstCapitalize(t('lote'))}
                            <br />
                            <input type='text' name="lote" onChange={formHandler} value={product.lote} className='p-1 rounded w-[100%] outline-none' />
                        </label>
                        }
                        <label>
                        {firstCapitalize(t('category'))}
                            <br />
                            <select name="category_id" value={product.category_id} onChange={formHandler} className='p-2 rounded w-[100%] outline-none'>
                                <option value="" disabled selected>Selecione uma categoria</option>
                                {categories.map((category) => <option value={category.id}>{category.name}</option>)}
                            </select>
                        </label>

                        {!productFilterRows.includes('taxes') &&

                            <label>
                            {firstCapitalize(t('taxes'))}
                                <br />
                                <input type='number' onChange={formHandler} name="taxes" value={product.taxes} className='p-1 rounded w-[100%] outline-none' />
                            </label>
                        }

                        {!productFilterRows.includes('status') &&

                            <label>
                        {firstCapitalize(t('status'))}
                                <br />
                                <select name="status" value={product.status?product.status:""} onChange={formHandler} className='p-2 rounded w-[100%] outline-none'>
                                    <option value="" disabled>Estado do produto</option>
                                    <option value={true}>{t('active')}</option>
                                    <option value={false}>{t('disative')}</option>
                                </select>
                            </label>
                        }

                        {!productFilterRows.includes('brand') &&
                            <label>
                        {firstCapitalize(t('brand'))}
                                <br />
                                <input type='text' onChange={formHandler} name="brand" value={product.brand} className='p-1 rounded w-[100%] outline-none' />
                            </label>
                        }

                        {!productFilterRows.includes('cost_price') &&

                            <label>
                            {firstCapitalize(t('cost_price'))}
                                <br />
                                <input type='number' onChange={formHandler} name="cost_price" value={product.cost_price} className='p-1 rounded w-[100%] outline-none' />
                            </label>
                        }
                        {!productFilterRows.includes('promotion') &&
                            <label>
                            {firstCapitalize(t('promotion'))}
                                <br />
                                <select name="promotion" value={product.promotion} onChange={formHandler} className='p-2 rounded w-[100%] outline-none'>
                                    <option value="" disabled selected>Produto em promocao </option>
                                    <option value={true}>Sim</option>
                                    <option value={false}>Nao</option>

                                </select>
                            </label>
                        }

                        {!productFilterRows.includes('discount') &&
                            <label>
                   {firstCapitalize(t('discount'))}
                   <br />
                                <input type='number' onChange={formHandler} name="discount" value={product.discount} className='p-1 rounded w-[100%] outline-none' min={0} />
                            </label>
                        }


                        {!productFilterRows.includes('weight') &&
                            <label>
                        {firstCapitalize(t('weight'))}
                                <br />
                                <input type='number' onChange={formHandler} name="weight" value={product.weight} className='p-1 rounded w-[100%] outline-none' />
                            </label>
                        }
                        {!productFilterRows.includes('mesure_unit') &&
                            <label>
                                {firstCapitalize(t('mesure_unit'))}
                                <br />
                                <select name="mesure_unit" value={product.mesure_unit} onChange={formHandler} className='p-2 rounded w-[100%] outline-none'>
                                    <option value="" disabled selected>Selecione a unidade </option>
                                    <option value="kg">kilograma (kg)</option>
                                    <option value="un">unidade (un)</option>
                                    <option value="l">litros (l)</option>
                                </select>
                            </label>
                        }


                        {!productFilterRows.includes('dimension') &&

                            <label>
                                {firstCapitalize(t('dimension'))}
                                <br />
                                <div className="flex gap-1 w-[100%]">
                                    <input type='number' onChange={(el) => {

                                        setDimensionVector({
                                            ...dimensionVector,
                                            w: el.target.value * 1
                                        });

                                        setProduct({
                                            ...product,
                                            dimension: dimensionVector
                                        })

                                    }} placeholder="Largura" value={dimensionVector.w} className='p-1 rounded w-[33%] outline-none' min={0} />
                                    <input type='number'
                                        onChange={(el) => {

                                            setDimensionVector({
                                                ...dimensionVector,
                                                h: el.target.value * 1
                                            });

                                        }}
                                        placeholder="Altura" name="discount" value={dimensionVector.h} className='p-1 rounded w-[33%] outline-none' min={0} />
                                    <input type='number' onChange={(el) => {

                                        setDimensionVector({
                                            ...dimensionVector,
                                            d: el.target.value * 1
                                        });
                                    }} placeholder="Profundidade" value={dimensionVector.d} className='p-1 rounded w-[33%] outline-none' min={0} />
                                    <input type='hidden' name='dimension' value={dimensionVector} />
                                </div>
                            </label>

                        }

                        {!productFilterRows.includes('manufacture_date') &&
                            <label>
                        {firstCapitalize(t('manufacture_date'))}       
                                <br />
                                <input type='date' name="manufacture_date" onChange={formHandler} value={product.manufacture_date} className='p-1 rounded w-[100%] outline-none' />
                            </label>
                        }

                        {!productFilterRows.includes('expire_date') &&
                            <label>
                                {firstCapitalize(t('expire_date'))} 
                                <br />
                                <input type='date' name="expire_date" onChange={formHandler} value={product.expire_date} className='p-1 rounded w-[100%] outline-none' />
                            </label>
                        }

                        {!productFilterRows.includes('location_in_stock') &&

                            <label>
                                {firstCapitalize(t('location_in_stock'))} 
                                <br />
                                <input type='text' name="location_in_stock" onChange={formHandler} value={product.location_in_stock} className='p-1 rounded w-[100%] outline-none' />
                            </label>
                        }

                        {!productFilterRows.includes('description') &&

                            <label>
                                {firstCapitalize(t('description'))} 
                                <br />
                                <textarea name="description" value={product.description} onChange={formHandler} className='p-2 rounded w-[100%] outline-none h-[70px]'>
                                </textarea>
                            </label>
                        }

                        {!productFilterRows.includes('observation') &&

                            <label>
                                {firstCapitalize(t('observation'))} 
                                <br />
                                <textarea name="observation" onChange={formHandler} value={product.observation} className='p-2 h-[70px] rounded w-[100%] outline-none'>
                                </textarea>
                            </label>
                        }
                        {!productFilterRows.includes('keyword') &&

                            <label>
                                {firstCapitalize(t('keyword'))} 
                                <br />
                                <input type='text' onChange={formHandler} name="keyword" value={product.keyword} className='p-1 rounded w-[100%] outline-none' />
                            </label>
                        }
                    </div>
                    <div className="flex justify-end p-2 mt-auto"><button 
                    type="button" 
                    onClick={handleFormSubmition}
                    className="p-2 bg-green-100 rounded">{product.id ? firstCapitalize(t('update')) : firstCapitalize(t('create'))}</button></div>
                </form>
            </LargeModal>
        </>
    );
};

export default Create;