import { Card, CardContent, Chip, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { Container, Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import Swal from 'sweetalert2'
import { getBlogDetail, setBlogDetail } from 'src/features/blogs/blogSlice'
import { blogDetail } from 'src/endpoints/blogs'
import Preloader from 'src/components/preloader/Preloader'

const BlogDetails = () => {

    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const details = useSelector(getBlogDetail) || {}

    const fetchData = async () => {
        setIsLoading(true)
        const res = await blogDetail({
            id
        })

        if(res?.data?.status == 1){
            setIsLoading(false)
            Swal.fire({
                title: 'Warning!',
                text: res.message,
                icon: 'warning',
                confirmButtonText: 'OK'
            })
        }

        if(res.data.status == 0){
            dispatch(setBlogDetail({detail: res?.data?.data}))
            setIsLoading(false)
        }

    }

    useEffect(() => {
        fetchData()
    },[])

  return (
    <>
        {
            isLoading ?
            <Preloader />
            :
            <>
                {
                    JSON.stringify(details) != '{}' ?
                        <Container sx={{ m: '20px auto' }}>
                            <Card>
                                <CardContent>
                                    <Typography variant='h3' component='h3' sx={{ my: '10px' }}>
                                        {details.title}
                                    </Typography>
                                    <Typography variant='body' component='p' sx={{ my: '10px' }}>
                                        {details.category.name} <Chip sx={{ mx: '5px' }} label={details.read_time+" min"} />
                                    </Typography>
                                    <Grid container>
                                        <Grid item md={12} >
                                                <Stack rowGap={3}>                                                
                                                    <img src={details.image} style={{ objectFit: 'contain' }} alt={details.title} />
                                                                                                        
                                                    <Typography variant='body' component='p'>
                                                        {details.description ?? ''}
                                                    </Typography>  


                                                    <Typography variant='body' component='p'>
                                                        <strong>Author -</strong> {details.author}
                                                    </Typography>  
                                                </Stack> 

                                                <Stack rowGap={3} direction={'row'} sx={{ my: '5px' }}>  
                                                    {
                                                        details.tags.map(tag => (
                                                            <Chip sx={{ mx: '5px' }} label={tag.name} />
                                                        ))
                                                    }
                                                </Stack>                      
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Container>
                    :
                    <Typography variant='h3' component='h3' align='center'>
                        There is no data
                    </Typography>

                }
            </>

        }
    </>
  )
}

export default BlogDetails