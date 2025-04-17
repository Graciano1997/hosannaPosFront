import { useTranslation } from "react-i18next";
import Card from "../general/Card";
import Title from "./Title";
import CardWrapper from "../general/CardWrapper";
import TabWrapper from "../general/TabWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { creatingCompany, deleteCompany, fetchCompanies, updateCompany, updatingCompany } from "../../slices/companySlice";
import Table from "../Table/Table";
import Create from "./Create";
import Profile from "./Profile";
import Account from "./Account";

const Setting=()=>{
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(fetchCompanies());
    },[]);

    const appState = useSelector((state)=>state.appState);
    const companyState = useSelector((state)=>state.companyState);
    
    const {t}=useTranslation();
    return(
        <CardWrapper>
        <Title title={t('settings')}/>
        <TabWrapper>

        {appState.activeTab=="tab1" &&
        <Account/>
        }

        { appState.activeTab=="tab2" && 
        <Profile/>
        }

        { appState.activeTab=="tab3" && 
        (
            companyState.companies.length?
            <Table filterDetails={[]} filterRows={companyState.companyFilterRows} update={updatingCompany} create={null} deleteItem={deleteCompany} collection={companyState.companies}/>
            :
            <Table filterDetails={[]} filterRows={companyState.companyFilterRows} update={updatingCompany} create={creatingCompany} deleteItem={deleteCompany} collection={companyState.companies}/>
        )
        }
        
        {/* {appState.activeTab=="tab2"  && (<ProductDashboard/>)}
        {appState.activeTab=="tab3" && !productState.error && !productState.loading && <Table filterDetails={filterCategoryDetails} update={updatingCategory} create={creatingCategory} deleteItem={deleteCategory}  filterRows={['parent_category_id','created_at','updated_at']}  collection={categoryState.categories || []}/>}
        {appState.activeTab=="tab5" && !productState.error && !productState.loading && <ProductConfiguration />} */}

        </TabWrapper>
        {(companyState.isCreating || companyState.isUpdating) && appState.isOpen && (<Create/>)}
        </CardWrapper>

    )
};

export default Setting;