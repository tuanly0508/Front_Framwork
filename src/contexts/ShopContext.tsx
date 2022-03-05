import React, { ReactNode, useEffect, useState } from "react";
import { productController } from "../controllers/ProductController";
import { Brand } from "../model/Brand";
import { PaginationModel } from "../model/Pagination";
import { Product } from "../model/Product";

interface ShopContextProviderProps {
    children: ReactNode
}

type State = {
    openModal: boolean
    idBrand: string
    idProductLine: string
    idProduct: string
    list: Product[]
    brand: Brand[]
    pagination: PaginationModel
    changeOpenModal: (openModal: boolean) => void
    changeIdProductLine: (idProductLine: string,idProduct:string,idBrand:string) => void
    changePage:(page:number) => void
    changeSort: (field:string,sort:string,search:string) => void
}

const StateDefault = {
    openModal: false,
    idBrand:'',
    idProductLine: '',
    idProduct:'',
    list: [],
    brand: [],
    pagination: { size: 0, page: 1, search: '', field: '', sort: '', countPage: 1 },
    changeOpenModal: () => { },
    changeIdProductLine: () => { },
    changePage: () => {},
    changeSort: () => {},
}

export const ShopContext = React.createContext<State>(StateDefault)

export const ShopContextProvider = ({ children }: ShopContextProviderProps) => {
    const [state, setState] = useState<State>(StateDefault)

    useEffect(() => {
        getProductPagination()
    }, [state.pagination.page, state.pagination.search, state.pagination.field, state.pagination.sort])

    const getProductPagination = () => {
        productController.pagination({ size: 8, page: state.pagination.page, search: state.pagination.search, field: state.pagination.field, sort: state.pagination.sort }).then(res => {
            setState(prev => ({ ...prev, list: res.list, brand: res.brand, pagination: { ...prev.pagination, countPage: Math.ceil(res.pageCount) } }))
        })
    }
    
    const changeOpenModal = (openModal: boolean) => {
        setState({...state,openModal:openModal})
    }

    const changeIdProductLine = (idProductLine: string,idProduct:string,idBrand:string) => {
        setState({ ...state, idProductLine: idProductLine,idProduct:idProduct,idBrand:idBrand})
    }

    const changePage = (page:number) => {
        setState(prev => ({...prev,pagination:{...prev.pagination,page:page}}))
    }

    const changeSort = (field:string,sort:string,search:string) => {
        setState(prev => ({...prev,pagination:{...prev.pagination,field:field,sort:sort,search:search}}))
    }
    
    const data: State = { 
        idProduct:state.idProduct,openModal: state.openModal, idProductLine: state.idProductLine,idBrand:state.idBrand,pagination:state.pagination,
        list:state.list,brand:state.brand,
        changeIdProductLine, changeOpenModal ,changePage,changeSort}

    return (
        <ShopContext.Provider value={data}>
            {children}
        </ShopContext.Provider>
    )
}

    // useEffect(() => {
    //     if (isInitialMount.current) {
    //         isInitialMount.current = false
    //     } else {
    //         if (state.idProductLine !== '') {
    //             productController.getDetail(state.idProductLine).then(res => {
    //                 console.log(res.product);
                    
    //                 setState(prev => ({ ...prev, image: res.image, product: res.product, dataWeight: res.weight, productDetail: res.product[0] }))
    //             })
    //         }
    //     }
    // }, [state.idProductLine])