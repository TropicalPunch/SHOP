import React from 'react'
import{Pagination} from 'react-bootstrap'
import{LinkContainer} from 'react-router-bootstrap'
const Paginate = ({pages, page, isAdmin= false, SearchKeyword=''}) => {
   

   
    return pages > 1 && (
        <Pagination >
            {[...Array(pages).keys()].map(elem=>(
                <LinkContainer key={elem+1} to={!isAdmin ?
                 SearchKeyword ? `/search/${SearchKeyword}/page/${elem+1}` : `/page/${elem+1}`
                 :
                 `/admin/products/${elem+1}`  }>
                    <Pagination.Item active={elem+1 === page} >
                        {elem+1}
                    </Pagination.Item>
                </LinkContainer>
                
            ))}
        </Pagination>
    )
}

export default Paginate
