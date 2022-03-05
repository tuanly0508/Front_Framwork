import React, {ReactNode, useEffect, useRef, useState } from "react";
import { productController } from "../controllers/ProductController";
import { DataRow } from "../page/admin/ProductAdmin";
import { Image } from "../model/Image"
import { Product } from "../model/Product";
import { weightController } from "../controllers/WeightController";
import { Weight } from "../model/Weight";
import { ProductLineAdmin } from "../model/ProductLineAdmin";
import { PaginationModel } from "../model/Pagination";
import { Brand } from "../model/Brand";
import { brandController } from "../controllers/BrandController";
import { categoryController } from "../controllers/CategoryController";
import { imageController } from "../controllers/ImageController";
import { Category } from "../model/Category";
import { ageController } from "../controllers/AgeController";
import { Age } from "../model/Age";

interface AdminContextProviderProps {
    children: ReactNode
}

type State = {
    urlEdit: Image[]
    rows: DataRow[]
    row: DataRow
    idProductLine:string
    isOpen:boolean,
    isModal:boolean,
    url:string[]
    product: Product[]
    dataCategory: Category[]
    dataWeight: Weight[]
    dataAge: Age[]
    dataBrand: Brand[]
    pagination: PaginationModel
    changeIsOpenProduct: (isModal:boolean) => void
    changeIsOpenModal: (isOpen:boolean) => void
    changeSearch: (search:string,field:string,sort:string) => void
    changeUrlDelete:(url:string) => void
    changeUrl: (url:string) => void
    getByIdProductLine: (idProductLine:string) => void
    changePage: (page:number) => void
    createProductLine: (product:ProductLineAdmin) => void
    updateProductLine: (name:string,idBrand:string,idCategory:string,idProductLine:string) => void
    deleteProductLine: (idProductLine:string) => void
    getProduct: (idProductLine:string) => void
    createProduct: (product:Product) => void
    updateProduct: (idProduct:string,idWeight:string,price:number,idColor:string) => void
    deleteProduct: (idProduct:string) => void
    createImage: (image:string) => void
    deleteImage: (image:string) => void
    changeUrlEdit: (urlEdit:Image) => void
    changeIdProductLine: (idProductLine:string) => void
    changeModalEdit: (nameProduct:string,category:string,brand:string) => void
}

const StateDefault = {
    urlEdit:[],
    rows:[],
    row: {create_at:'',id_product_line:'',name_brand:'',name_category:'',name_product:'',update_at:''},
    idProductLine:'',
    isOpen:false,
    isModal:false,
    url: [],
    product: [],
    dataCategory: [],
    dataWeight: [],
    dataAge: [],
    dataBrand: [],
    pagination: {size:10,page:1,search:'',field:'',sort:'',countPage:1},
    changeIsOpenProduct: () => {},
    changeIsOpenModal: () => {},
    changeSearch: () => {},
    changeUrlDelete: () => {},
    changeUrl: () => {},
    getByIdProductLine: () => {},
    changePage: () => {},
    createProductLine: () => {},
    updateProductLine: () => {},
    deleteProductLine: () => {},
    getProduct: () => {},
    createProduct: () => {},
    updateProduct: () => {},
    deleteProduct: () => {},
    createImage: () => {},
    deleteImage: () => {},
    changeUrlEdit: () => {},
    changeIdProductLine: () => {},
    changeModalEdit: () => {},
}

export const AdminContext = React.createContext<State>(StateDefault)

export const AdminContextProvider = ({ children }: AdminContextProviderProps) => {
    const isInitialMount = useRef(true);
    const [state, setState] = useState<State>(StateDefault)

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false
            getProductLine()
            getBrand()
            getWeight()
            getCategory()
            getAge()
        }else {
            getProductLine()
        }
    },[state.pagination.search,state.pagination.page,state.pagination.field,state.pagination.sort])
    
    const getProductLine = () => {
        productController.getProductLine(state.pagination).then(res => {
            setState(prev=>({...prev,rows:res.list,pagination: {...prev.pagination,countPage:Math.ceil(res.pageCount)}}))
        })
    }

    const createProductLine = (product:ProductLineAdmin) => {
        productController.createProductLine(product,state.pagination).then(res => {
            setState(prev=>({...prev,rows:res.list,countPage:Math.ceil(res.pageCount)}))
        })
    }

    const updateProductLine = (name:string,idBrand:string,idCategory:string,idProductLine:string) => {
        productController.updateProductLine(name,idBrand,idCategory,idProductLine,state.pagination).then(res => {
            setState(prev=>({...prev,rows:res.list,countPage:Math.ceil(res.pageCount)}))
        })
    }

    const deleteProductLine = (idProductLine:string) => {
        productController.deleteProductLine(idProductLine,state.pagination).then(res => {
            setState(prev=>({...prev,rows:res.list,countPage:Math.ceil(res.pageCount)}))
        })
    }

    const changeSearch = (search:string,sort:string) => {
        setState(prev=>({...prev,pagination: {...prev.pagination,search:search}}))
        if(sort === '1') setState(prev=>({...prev,pagination: {...prev.pagination,field:'name_product',sort:'asc'}}))
        else if (sort === '2') setState(prev=>({...prev,pagination: {...prev.pagination,field:'name_product',sort:'desc'}}))
        else if (sort === '3') setState(prev=>({...prev,pagination: {...prev.pagination,field:'create_at',sort:'asc'}}))
        else if (sort === '4') setState(prev=>({...prev,pagination: {...prev.pagination,field:'create_at',sort:'desc'}}))
        else if (sort === '5') setState(prev=>({...prev,pagination: {...prev.pagination,field:'update_at',sort:'asc'}}))
        else if (sort === '6') setState(prev=>({...prev,pagination: {...prev.pagination,field:'update_at',sort:'desc'}}))
    }

    const changePage = (page:number) => {
        setState(prev=>({...prev,pagination:{...prev.pagination,page:page}}))
    }

    const getCategory = () => {
        categoryController.get().then(res => {
            setState(prev => ({ ...prev, dataCategory:res }))
        })
    }

    const getAge = () => {
        ageController.get().then(res => {
            setState(prev => ({ ...prev, dataAge:res }))
        })
    }

    const getBrand = () => {
        brandController.get().then(res => {
            setState(prev => ({ ...prev, dataBrand:res }))
        })
    }

    const getWeight = () => {
        weightController.get().then(res => {
            setState(prev => ({ ...prev, dataWeight:res }))
        })
    }

    const changeIdProductLine = (idProductLine: string) => {
        setState(prev => ({...prev,idProductLine:idProductLine}))
    }

    const getProduct= (idProductLine:string) => {
        productController.getProduct(idProductLine).then(res => {
            setState(prev=>({...prev,product:res}))
        })
    }

    const createProduct = (product:Product) => {
        productController.createProduct(product).then(res => {
            setState(prev=>({...prev,product:res}))
        })
    }

    const updateProduct = (idProduct:string,idWeight:string,price:number,idColor:string) => {
        productController.updateProduct(idProduct,idWeight,price,state.idProductLine,idColor).then(res => {
            setState(prev=>({...prev,product:res}))
        })
    }

    const deleteProduct = (idProduct:string) => {
        productController.deleteProduct(idProduct,state.idProductLine).then(res => {
            setState(prev=>({...prev,product:res}))
        })
    }

    const getByIdProductLine = (idProductLine:string) => {
        productController.getByIdProductLine(idProductLine).then(res => {
            console.log(res);
            
            setState(prev=>({...prev,urlEdit:res.image,row:res.list[0]}))
        })
    }

    const createImage = (image:string) => {
        imageController.createImage(state.idProductLine,image).then(res => {
            setState(prev=>({...prev,urlEdit:res.image,row:res.list[0]}))
        })
    }

    const deleteImage = (image:string) => {
        imageController.deleteImage(image,state.idProductLine).then(res => {
            setState(prev=>({...prev,urlEdit:res.image,row:res.list[0]}))
        })
    }
    
    const changeIsOpenModal = (isOpen: boolean) => {
        setState(prev=>({...prev,isOpen:isOpen}))
    }

    const changeIsOpenProduct = (isOpen: boolean) => {
        setState(prev=>({...prev,isModal:isOpen}))
    }

    const changeUrl = (url: string) => {
        state.url.push(url)
    }
    
    const changeUrlEdit = (url: Image) => {
        state.urlEdit.push(url)
    }

    const changeUrlDelete = (url:string) => {
        const a = state.url.filter(data => data !== url)
        setState(prev => ({...prev,url:a}))
    }

    const changeModalEdit = (nameProduct:string,category:string,brand:string) => {
        setState(prev=>({...prev,row: {...prev.row,name_product:nameProduct,name_category:category,name_brand:brand}}))
    }

    const data: State = {
        idProductLine:state.idProductLine,urlEdit:state.urlEdit,row:state.row,rows:state.rows,url: state.url,isOpen:state.isOpen,isModal:state.isModal,
        dataAge:state.dataAge,pagination:state.pagination,dataWeight:state.dataWeight,dataCategory:state.dataCategory,dataBrand:state.dataBrand,product: state.product,
        getByIdProductLine,updateProductLine,deleteProductLine,createProductLine,changePage,
        getProduct,createProduct,updateProduct,deleteProduct,createImage,deleteImage,changeIdProductLine,
        changeIsOpenModal,changeUrl,changeSearch,changeModalEdit,changeUrlEdit,changeIsOpenProduct,changeUrlDelete
    }

    return (
        <AdminContext.Provider value={data}>
            {children}
        </AdminContext.Provider>
    )
}