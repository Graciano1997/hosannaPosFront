import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Table from "../Table/Table";
import Create from "./Create";
import Title from "../general/Title";
import ProductDashboard from "./ProductDashboard";
import { useDispatch, useSelector } from "react-redux";
import { creatingProduct, deleteProduct, fetchProductConfiguration, fetchProducts, stopCreatingProduct, updatingProduct } from "../../slices/productSlice";
import CardWrapper from "../general/CardWrapper";
import TabWrapper from "../general/TabWrapper";
import { creatingCategory, deleteCategory, fetchCategories, stopCreatingCategory, updateCategory, updatingCategory } from "../../slices/categorySlice";
import CreateCategory from "./CreateCategory";
import ProductConfiguration from "./ProductConfiguration";
import { creatingUser, deleteUser, fetchUsers } from "../../slices/userSlice";

const User=()=>{
    
    const appState=useSelector((state)=>state.appState);
    const {t}=useTranslation();
    const [isShowing,setIsShowing]=useState(false);
    const dispatch = useDispatch();
    const userState = useSelector((state)=>state.userState);
    const filterDetails =['id','image','profile_id']

    useEffect(()=>{
        dispatch(fetchUsers());
    },[])
    
    const users = userState.users;
    return(
        <CardWrapper>
        <Title create={creatingProduct} title={t('users')}/>
        <TabWrapper>
        {/* {appState.activeTab=="tab1" && userstate.loading && 
        <div className=" mt-[5rem] flex justify-center">
            <h4 className="text-3xl">Loading the Users...</h4>
        </div>
        } */}

        {/* {appState.activeTab=="tab1" && !userstate.loading && 
        userstate.error &&
        <div className="mt-[5rem] flex justify-center">
            <h4 className="text-3xl text-red-700">{userstate.error}</h4>
        </div>
        } */}
        {appState.activeTab=="tab1" && <Table filterDetails={filterDetails} filterRows={['profile_id']} update={updatingProduct} create={creatingUser} deleteItem={deleteUser} collection={users}/>}
        
        {/* {appState.activeTab=="tab2"  && (<ProductDashboard/>)} */}
        {/* {appState.activeTab=="tab3" && !userstate.error && !userstate.loading && <Table update={updatingCategory} create={creatingCategory} deleteItem={deleteCategory}  filterRows={['created_at','updated_at']}  collection={categoryState.categories}/>} */}
        {/* {appState.activeTab=="tab4" && !userstate.error && !userstate.loading && <ProductConfiguration />} */}
        </TabWrapper>
        {(userState.isCreating  || userState.isUpdating ) && appState.isOpen && (<Create stopCreating={stopCreatingProduct} setIsShowing={setIsShowing}/>)}
        </CardWrapper>
    )
};

export default User;
