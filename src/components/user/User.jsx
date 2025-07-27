import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Table from "../Table/Table";
import Create from "./Create";
import Title from "../general/Title";
import { useDispatch, useSelector } from "react-redux";
import { creatingProduct, deleteProduct, fetchProductConfiguration, fetchProducts, stopCreatingProduct, updatingProduct } from "../../slices/productSlice";
import CardWrapper from "../general/CardWrapper";
import TabWrapper from "../general/TabWrapper";
import { creatingUser, deleteUser, fetchUsers, setUser, stopCreatingOrUpdateingUser, updatingUser } from "../../slices/userSlice";
import { activeTab } from "../../slices/appSlice";

const User=()=>{    
    const dispatch = useDispatch();
    const [userCollectionKeys,setUserCollectionKeys]=useState([]);

    useEffect(()=>{
        dispatch(fetchUsers());
        dispatch(activeTab('tab1'))
    },[])

    const appState=useSelector((state)=>state.appState);
    const {t}=useTranslation();
    const userState = useSelector((state)=>state.userState);
    const filterDetails =['id','image','profile_id']    
    const users = userState.users;


    return(
        <CardWrapper>
        <Title create={creatingProduct} update={updatingUser} title={t('users')} collectionToExport={{
            model:t('users'),
            data:users}}/>
        <TabWrapper>
      
        {appState.activeTab=="tab1" && <Table setCollection={setUser} filterDetails={filterDetails} filterRows={['profile_id']} update={updatingUser} create={creatingUser} dispatcher={setUser} fetcher={fetchUsers} deleteItem={deleteUser} collection={users}/>}
        
        </TabWrapper>
        {(userState.isCreating  || userState.isUpdating ) && appState.isOpen && (<Create stopCreating={stopCreatingOrUpdateingUser}/>)}
        </CardWrapper>
    )
};

export default User;
