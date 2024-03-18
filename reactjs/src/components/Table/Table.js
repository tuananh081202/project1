import React, { useEffect, useState } from 'react'
import LiveSearch from './LiveSearch';

const UserTable = (props) => {
    const { name, data, columns, currentPage, numOfPage, onPageChange, onChangeItemsPerPage, onKeySearch, onSelectedRows} = props;
    const [selectedRows, setSelectedRows] = useState([])
    const [sortBy, setSortBy] = useState({ column: null, direction: null });

    

    useEffect(() => {
        console.log('selected rows=> ', selectedRows)
        onSelectedRows(selectedRows)
    }, [selectedRows]);
    
    const renderHeaders = () => {
        return columns.map((col, index) => (
            <th key={index} onClick={() => handleSort(col.name)}>
                {col.name} {sortBy.column === col.name && (
                    sortBy.direction === 'asc' ? '▲' : '▼',
                    console.log("sort by",sortBy)
                )}
            </th>
        ));
    };

    const handleSort = (column) => {
        const direction = sortBy.column === column && sortBy.direction === 'asc' ? 'desc' : 'asc';
        setSortBy({ column, direction });
    };

    const renderData = () => {
        let sortedData = [...data];
        if (sortBy.column) {
            sortedData = sortedData.sort((a, b) => {
                const aValue = a[sortBy.column];
                const bValue = b[sortBy.column];
                if (sortBy.direction === 'asc') {
                    return aValue < bValue ? -1 : 1;
                } else {
                    return aValue > bValue ? -1 : 1;
                }
            });
        }

        return sortedData.map((item, index) => (
            <tr key={index}>
                <td><input type='checkbox' checked={selectedRows.includes(String(item.id))} className='form-check-input' value={item.id} onChange={onClickCheckbox} /></td>
                {columns.map((col, ind) => <td key={ind}>{col.element(item)}</td>)}
            </tr>
        ));
    };


    const onClickCheckbox = (event) => {
        let checked = event.target.checked;
        let value = event.target.value;
        if (checked) {
            if (!selectedRows.includes(value)) {
                setSelectedRows([...selectedRows, value])
            }
        } else {
            let index = selectedRows.indexOf(value)
            const temp = [...selectedRows]
            temp.splice(index, 1)
            setSelectedRows(temp)
        }
    }

    const onSelectAll = (event) => {
        if (event.target.checked) {
            const temp = data.map(element => String(element.id))
            setSelectedRows(temp)
        } else {
            setSelectedRows([])
        }
    }

    const renderPagination = () => {
        const pagination = [];
        const nextPage = currentPage + 1 > numOfPage ? null : currentPage + 1;
        const prevPage = currentPage - 1 < 1 ? null : currentPage - 1;

        pagination.push(
            <li key="prev" className={prevPage ? 'page-item' : "page-item disabled"}>
                <button className='page-link' onClick={() => onPageChange(prevPage)}>&laquo;</button>
            </li>
        )

        for (let i = 1; i <= numOfPage; i++) {
            pagination.push(
                <li key={i} className={currentPage === i ? "page-item active" : "page-item"}>
                    <button className='page-link' onClick={() => onPageChange(i)}>{i}</button>
                </li>

            )
        }

        pagination.push(
            <li key="next" className={nextPage ? 'page-item' : "page-item disabled"}>
                <button className='page-link' onClick={() => onPageChange(nextPage)}>&raquo;</button>
            </li>
        )
        return pagination;
    }

    const onChangeOption = (event) => {
        const target = event.target;
        console.log("change items per page to =>", target)
        onChangeItemsPerPage(target.value)
    }



    return (

        <div className="card mb-4">
            {/* <div className="card-body">

                DataTables là plugin của bên thứ ba được sử dụng để tạo bảng demo bên dưới. Để biết thêm thông tin về DataTables, vui lòng truy cập
                <a target="_blank" href="https://datatables.net/"> Tài liệu DataTables chính thức </a>
                .
            </div> */}

            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1"></i>
                    {name}
                </div>
                <div className="card-body">
                    <div className='row mb-3'>
                        <div className='col-sm-12 col-md-6'>
                            <label className='d-inline-flex'>Show
                                <select className="form-select form-select-sm ms-1 me-1" onChange={onChangeOption}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="5">5</option>
                                    <option value="20">20</option>
                                </select> entries
                            </label>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                            <label className='d-inline-flex float-end'>Search:
                                <LiveSearch onKeySearch={onKeySearch} />

                            </label>
                        </div>
                    </div>
                    <table className='table table-striped table-bordered' cellPadding="0" width="100%">
                        <thead>
                            <tr >

                                <td><input checked={selectedRows.length === data.length && data.length > 0 ? true : false} type='checkbox' className='form-check-input' onChange={onSelectAll} /></td>

                                {renderHeaders()}

                            </tr>
                        </thead>

                        <tbody>
                            {renderData()}

                        </tbody>
                        {/* <tfoot>
                            <tr>
                                {renderHeaders()}
                            </tr>
                        </tfoot> */}
                       
                    </table>
                    {numOfPage > 1 && (
                        <div className='row'>
                            <div className="col-sm-12 col-md-12">
                                <ul className='pagination justify-content-end'>

                                    {renderPagination()}

                                </ul>
                            </div>
                        </div>
                    )}

                </div>

            </div>
        </div>
    )
}

export default UserTable