import { useTranslation } from "react-i18next";
import Title from "./Title";
import CardWrapper from "../general/CardWrapper";
import TabWrapper from "../general/TabWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { creatingCompany, deleteCompany, fetchCompanies, setCompany, updateCompany, updatingCompany } from "../../slices/companySlice";
import Table from "../Table/Table";
import Create from "./Create";
import Profile from "./Profile";

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


        { appState.activeTab=="tab2" && 
        <Profile/>
        }

        { appState.activeTab=="tab1" && 
        (
            companyState.companies.length?
            <Table filterDetails={[]} setCollection={setCompany}  filterRows={companyState.companyFilterRows} update={updatingCompany} create={null} deleteItem={deleteCompany} collection={companyState.companies}/>
            :
            <Table filterDetails={[]} setCollection={setCompany} filterRows={companyState.companyFilterRows} update={updatingCompany} create={creatingCompany} deleteItem={deleteCompany} collection={companyState.companies}/>
        )
        }
        
        </TabWrapper>
        {(companyState.isCreating || companyState.isUpdating) && appState.isOpen && (<Create/>)}
        </CardWrapper>

    )
};

export default Setting;