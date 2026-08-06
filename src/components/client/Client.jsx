import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import Create from "./Create";
import Title from "../general/Title";
import { useDispatch, useSelector } from "react-redux";
import CardWrapper from "../general/CardWrapper";
import TabWrapper from "../general/TabWrapper";
import {creatingClient, deleteClient, fetchClients, searchClients, setClient, stopCreatingOrUpdateingClient, updatingClient } from "../../slices/clientSlice";
import { activeTab } from "../../slices/appSlice";

const Client= React.memo(
    ()=>{    
    const dispatch = useDispatch();
    const [clientCollectionKeys,setClientCollectionKeys]=useState([]);
    const clientState = useSelector((state)=>state.clientState);

    useEffect(()=>{
        const loadData = async () => {
            await Promise.all([
                
                dispatch(fetchClients()),
                dispatch(activeTab('tab1'))
            ])
        }
            loadData(); 
    },[])

    const appState=useSelector((state)=>state.appState);
    const {t}=useTranslation();
    const filterDetails =['id','image','profile_id']    
    const clients = clientState.clients;


    return(
        <CardWrapper>
        <Title create={creatingClient} update={updatingClient} title={t('clients')} collectionToExport={{
            model:t('clients'),
            data:clients}}/>
        <TabWrapper>
      
    {appState.activeTab=="tab1" && <Table setCollection={setClient} filterDetails={filterDetails} filterRows={['profile_id']} update={updatingClient} create={null} dispatcher={setClient} fetcher={fetchClients} deleteItem={deleteClient} collection={clients} fetcherParam={clientState.last_created_at} searchBackEndHandler={searchClients} />}
        
        </TabWrapper>
        {(clientState.isCreating  || clientState.isUpdating ) && appState.isOpen && (<Create stopCreating={stopCreatingOrUpdateingClient}/>)}
        </CardWrapper>
    )
});

export default Client;
