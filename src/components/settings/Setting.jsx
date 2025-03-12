import { useTranslation } from "react-i18next";
import Card from "../general/Card";
import Title from "./Title";
import CardWrapper from "../general/CardWrapper";
import TabWrapper from "../general/TabWrapper";

const Setting=()=>{
    const {t}=useTranslation();
    return(
        <CardWrapper>
        <Title title={t('settings')}/>
        <TabWrapper>   
        {/* {appState.activeTab=="tab1" && !productState.error && !productState.loading &&
        // <Table filterDetails={filterProductDetails} filterRows={(productState.productFilterRows).concat('category_id')} update={updatingProduct} create={creatingProduct} deleteItem={deleteProduct} collection={products}/>
        } */}
        
        {/* {appState.activeTab=="tab2"  && (<ProductDashboard/>)}
        {appState.activeTab=="tab3" && !productState.error && !productState.loading && <Table filterDetails={filterCategoryDetails} update={updatingCategory} create={creatingCategory} deleteItem={deleteCategory}  filterRows={['parent_category_id','created_at','updated_at']}  collection={categoryState.categories || []}/>}
        {appState.activeTab=="tab4" && !productState.error && !productState.loading && <Table filterDetails={filterCategoryDetails} collection={productState.expireds || []}/>}
        {appState.activeTab=="tab5" && !productState.error && !productState.loading && <ProductConfiguration />} */}

        </TabWrapper>
        </CardWrapper>

    )
};

export default Setting;