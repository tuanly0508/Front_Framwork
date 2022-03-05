import ReactPaginate from 'react-paginate';
import './Pagination.css'

interface Props {
    pageCount: number
    page: (page: number) => void
}

export default function Pagination(props:Props) {
    const changePage = ({selected}:any) => {
        props.page(selected+1)
    }
    
    return (
        <ReactPaginate
            previousLabel="<<"
            nextLabel=">>"
            pageCount={props.pageCount}
            onPageChange={changePage}
            containerClassName='paginationBtn'
            previousClassName='previousBtn'
            nextLinkClassName='nextBtn'
            disabledClassName='paginationDisable'
            activeClassName='paginationActive'
        />
    )
}
