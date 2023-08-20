import { Add, Delete, Edit, RemoveRedEye } from '@mui/icons-material'
import { IconButton, Pagination, Stack, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fDateTime } from '../../utils/formatTime'
import Swal from 'sweetalert2'
import { Helmet } from 'react-helmet-async'
import { getBlogTotalCount, getBlogs, removeBlogs, setBlogs } from '../../features/blogs/blogSlice'
import { deleteBlog, fetchBlogs } from '../../endpoints/blogs'
import Preloader from 'src/components/preloader/Preloader';
import StartIconButton from 'src/components/Button/StartIconButton';

const Blogs = () => {

    const dispatch = useDispatch()
    const [page, setPage] = React.useState(1);
    const [perPage, setPerPage] = React.useState(10);
    const blogs = useSelector(getBlogs) || []
    const total_count = useSelector(getBlogTotalCount)
    const [isLoading, setIsLoading] = useState(false)

    const fetchData = async () => {
        setIsLoading(true)
        const res = await fetchBlogs({
            page: page,
            per_page: perPage,
        })
        dispatch(setBlogs({data: res.data.data, total_count: res.data.total_count}))
        setIsLoading(false)

    }

    useEffect(() => {
        fetchData()
    },[page])


    let  columns = [
          { id: 'id', label: 'Id', minWidth: 100 },
          { id: 'title', label: 'Title', minWidth: 100 },
          { id: 'image', label: 'Image', minWidth: 100 },
          { id: 'description', label: 'Description', minWidth: 100 },
          { id: 'author', label: 'author', minWidth: 100 },
          { id: 'read_time', label: 'read Time', minWidth: 100 },
          { id: 'category', label: 'Category', minWidth: 100 },
          { id: 'createdAt', label: 'Created At', minWidth: 100 },
          { id: 'action', label: 'Action', minWidth: 100 },    
    ];
      

    const removeBlog = async (id) => {
      const res = await deleteBlog({
          id 
      })

      if(res.data.status == 0){
          dispatch(removeBlogs(id))
          Swal.fire({
              title: 'Success!',
              text: 'Blog Deleted Successfully !',
              icon: 'success',
              confirmButtonText: 'OK'
            })
      }
    }

    const handleAlert = async (id) => {
      Swal.fire({
          title: 'Do you want to delete?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Delete',
        }).then((result) => {
          if (result.isConfirmed) {
            removeBlog(id)
          } 
        })
    }

    const createAction = (id) => (
      <>
          <Stack direction="row" spacing={2}>
              <NavLink to={`/blogs/details/${id}`}>
                  <IconButton>
                      <RemoveRedEye />
                  </IconButton>
              </NavLink>
              <NavLink to={`/blogs/manage?id=${id}`}>
                  <IconButton>
                      <Edit />
                  </IconButton>
              </NavLink>
              <IconButton onClick={() => handleAlert(id)}>
                  <Delete />
              </IconButton>
          </Stack>
      </>
    )

    const imgFormat = (url) => (
      <img src={url} width='200px' height='150px' style={{ objectFit: 'contain' }} />
    )

      
    function createData(id,title,image,description,author,read_time,category,createdAt) {
        return {id,title,image,description:description,author,read_time,category,createdAt,action: createAction(id)};
    }

    let rows = []
    
    if(blogs.length > 0){
        rows = blogs.map(blog => (
            createData(
              blog.id, 
              blog.title, 
              imgFormat(blog.image),
              blog.description.slice(0,50)+'...',
              blog.author,
              blog.read_time+' min',
              blog.category.name,
              fDateTime(blog.createdAt),
            )
        ));
    }

    const handlePaginationChange = (event,value) => {
        setPage(value);
    };
  
  return (
    <>
        <Helmet>
            <title>Blogs</title>
        </Helmet>
        <Container maxWidth	='100%'>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >
                <Typography variant="h3" component='h3'>
                    Blogs
                </Typography>
                <Link to={'/blogs/manage'}>
                    <StartIconButton text='Add New' variant='contained' icon={<Add />} />
                </Link>
            </Stack>
            {
                isLoading ?
                 <Preloader />
                    :
                    <>
                      <Stack direction='row' spacing={4}  alignItems='center' justifyContent='space-between'>
                          <Stack sx={{ m: '20px 0' }} direction='row' spacing={2} alignItems='center'>
                          <Typography variant='title' component='p'>
                              { rows.length == 0 ? 0 : (page * perPage) - 9} - {((page - 1) * perPage) + rows.length} of {total_count}
                          </Typography>
                          <Pagination count={Math.ceil(total_count  / perPage)} page={page} onChange={handlePaginationChange} hideNextButton={page == Math.ceil(total_count / perPage) ? true : false} />
                          </Stack>
                      </Stack>
                      
                      {
                      rows.length == 0 ?
                          <Typography variant='h3' component='h3' align='center' sx={{ mt: '20px' }}>
                              There is no data
                          </Typography>
                          :
                          <>
                          <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '24px' }}>
                              <TableContainer sx={{ maxHeight: 700 }}>
                                  <Table stickyHeader aria-label="sticky table">
                                  <TableHead>
                                      <TableRow>
                                      {columns.map((column) => (
                                          <TableCell
                                          key={column.id}
                                          align={column.align}
                                          style={{ minWidth: column.minWidth }}
                                          >
                                          {column.label}
                                          </TableCell>
                                      ))}
                                      </TableRow>
                                  </TableHead>
                                  <TableBody>
                                      {
                                      rows.length > 0 ?
                                      rows
                                      .map((row) => {
                                          return (
                                          <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                              {columns.map((column) => {
                                                  const value = row[column?.id] !== '' ? row[column?.id] : '-';
                                                  return (
                                                      <React.Fragment key={column.id}>
                                                          <TableCell align={column.align}>
                                                            {value}
                                                          </TableCell>
                                                      </React.Fragment>
                                                  );
                                              })}
                                          </TableRow>
                                          );
                                      })
                                      : ''
                                  }
                                  </TableBody>
                              </Table>
                          </TableContainer>
                          
                          </Paper>
                          </>
                      }
                    </>
                
            }
        </Container>
    </>
  )
}

export default Blogs