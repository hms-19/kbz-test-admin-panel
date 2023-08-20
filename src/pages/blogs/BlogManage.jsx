import { Box, Button, Card, CardContent, CardHeader, Checkbox, Chip, FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import { Add } from '@mui/icons-material';
import Swal from 'sweetalert2'
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogDetail, setBlogDetail } from 'src/features/blogs/blogSlice'
import { blogDetail, createBlog, updateBlog } from 'src/endpoints/blogs'
import { getCategories, setCategories } from 'src/features/categories/categoriesSlice'
import { fetchCategories } from 'src/endpoints/categories'
import { getTags, setTags } from 'src/features/tags/tagsSlice'
import { fetchTags } from 'src/endpoints/tags'
import { convertImageUrlToBase64 } from 'src/utils/file'


registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateSize,FilePondPluginFileEncode)
    

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const BlogManage = () => {
  
  const [isEdit, setIsEdit] = useState(false)

  const location = useLocation()
  let id = queryString.parse(location.search).id
  const dispatch = useDispatch()
  const details = useSelector(getBlogDetail) || {}
  const categories = useSelector(getCategories) || []
  const tags = useSelector(getTags) || []
  const navigate = useNavigate()

  const [data, setData] = useState({
    title : '',
    image : '',
    avatar : '',
    description : '',
    author : '',
    read_time: '',
    category_id: '',
    tag_ids: []
  })

  const [loading, setLoading] = useState(false)
  const [isPreview,setIsPreview] = useState(false)
  const [selectedTags,setSelectedTags] = useState([])

  const [image, setImage] = useState('')
  const [avatar, setAvatar] = useState('')



  const EnterTextField = (key, value) => {
    setData({...data, [key]: value})
  }

  const fetchCategoriesAndTagsData = async () => {
    const res = await fetchCategories({
      page: 1,
      per_page: "all"
    })

    if(res?.data?.status == 1){
        Swal.fire({
            title: 'Warning!',
            text: res.message,
            icon: 'warning',
            confirmButtonText: 'OK'
        })
    }

    if(res.data.status == 0){
        dispatch(setCategories({data: res?.data.data, total_count: res?.data.total_count}))
    }

    const tagres = await fetchTags({
        page: 1,
        per_page: "all"
    })
  
    if(tagres?.data?.status == 1){
        Swal.fire({
            title: 'Warning!',
            text: tagres.message,
            icon: 'warning',
            confirmButtonText: 'OK'
        })
    }

    if(tagres.data.status == 0){
        dispatch(setTags({data: tagres?.data.data, total_count: tagres?.data.total_count}))
    }
  }
  
  const fetchData = async () => {
    const res = await blogDetail({
      id
    })

    if(res?.data?.status == 1){
        Swal.fire({
            title: 'Warning!',
            text: res.message,
            icon: 'warning',
            confirmButtonText: 'OK'
        })
    }

    if(res.data.status == 0){
        dispatch(setBlogDetail({detail: res?.data.data}))
    }
  }

  useEffect(() => {
    if(id !== undefined){
      fetchData()
      setIsEdit(true)   
    }

  },[])

  useEffect(() => {
    fetchCategoriesAndTagsData()
  },[])

  const makeTourRequest = async () => {  
    setLoading(true)
    let res
    if(!isEdit){
      res = await createBlog({
        ...data,
      })
    }
    else{
      if(id !== undefined){
        res = await updateBlog({
            ...data,
            id,
        })
      }
      else{
        Swal.fire({
          title: 'Warning!',
          text: 'There is no blog id',
          icon: 'warning',
          confirmButtonText: 'OK'
        })
      }
    }

    if(res?.data?.status !== 0){
      setLoading(false)
      Swal.fire({
        title: 'Warning!',
        text: res.data?.message || res.data?.errors[0].message,
        icon: 'warning',
        confirmButtonText: 'OK'
      })
    }
    else{
      setIsEdit(false)

      Swal.fire({
        title: 'Success!',
        text: isEdit ? 'Blog updated successfully !' : 'Blog created successfully !',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      navigate('/blogs')
    }
    
  }

  const handleFormSubmit = async () => {
    if(
        data.title != '' &&
        data.description != '' &&
        data.author != '' &&
        image != '' 
    ){
        makeTourRequest()
  }
  else{
    Swal.fire({
      title: 'Warning!',
      text: 'Please Fill All Fields !',
      icon: 'warning',
      confirmButtonText: 'OK'
    })
  } 
  }
  
  useEffect(() => {
    if(isEdit){
      setData({
        title : details.title,
        description : details.description,
        author : details.author,
        read_time: details.read_time,
        category_id: details.category.category_id,
        tags: details.tags
      })

      let base64Image = convertImageUrlToBase64(details.image)
      console.log(base64Image)
      // console.log(details.image)
      // console.log(base64Image)

      setImage(details.image)
      setAvatar(details.avatar)
      setSelectedTags(details.tags.map(tag => tag.tag_id));
    }
  },[details])

  useEffect(() => {
    setData({
        ...data,
        tag_ids: selectedTags
    })
  },[selectedTags])

  const handleTagChange = (event) => {
    const {value} = event.target;
    setSelectedTags(value);
  };

  return (
    <>
      <Helmet>
        <title> {isEdit ? 'Edit' : 'Create'} Blogs </title>
      </Helmet>
      <Container maxWidth='100%'>
          <Card sx={{ 
              marginTop: '6px'
          }}>
            <CardHeader title={isEdit ? 'Edit Blog' : 'Add New Blog'} sx={{ 
              padding: '20px',
            }} />
            <CardContent>
              <Grid container spacing={4}>
                
                <Grid item xs={12} sx={{ m: '0 auto' }}>
                  <Grid container>
                    <Grid item md={6} xs={12} sx={{ m: 'auto' }}>
                      <FilePond
                        files={image}
                        onupdatefiles={setImage}
                        allowMultiple={false}
                        allowFileEncode={true}
                        allowFileSizeValidation={true}
                        maxFileSize='20MB'
                        imagePreviewMarkupShow={isPreview}
                        name="image" 
                        oninit={() => {
                            setIsPreview(true)
                        }}
                        onaddfile={(error,file) => {
                            setData(() => ({...data,image: file.getFileEncodeDataURL()}))
                        }}
                        labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse Image</span>'                  
                      />
                    </Grid>
                  </Grid> 
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl sx={{ minWidth: '100%' }}>
                    <InputLabel id="category_id-label">Select Category</InputLabel>
                    <Select
                      labelId="category_id-label"
                      id="category_id"
                      fullWidth
                      value={data.category_id}
                      onChange={(e) => EnterTextField('category_id',e.target.value)} 
                      label="Select Category" 
                    >
                        {
                            categories.length > 0 ?
                            categories.map((category,index) => (
                                <MenuItem key={index} value={category.id}>{category.name}</MenuItem>
                            ))
                            : <MenuItem value=''></MenuItem>
                        }
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField 
                    id="title" 
                    label="Title" 
                    fullWidth
                    value={data.title}
                    onChange={(e) => EnterTextField('title',e.target.value)}
                    variant="outlined" />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField 
                    id="read_time" 
                    label="Read Time" 
                    fullWidth
                    value={data.read_time}
                    onChange={(e) => EnterTextField('read_time',e.target.value)}
                    variant="outlined" />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField 
                    id="author" 
                    label="Author Name" 
                    fullWidth
                    value={data.author}
                    onChange={(e) => EnterTextField('author',e.target.value)}
                    variant="outlined" />
                </Grid>

                <Grid item xs={12} sx={{ m: '0 auto' }}>
                  <Grid container>
                    <Grid item md={6} xs={12} sx={{ m: 'auto' }}>
                      <FilePond
                        files={avatar}
                        onupdatefiles={setAvatar}
                        allowMultiple={false}
                        allowFileEncode={true}
                        allowFileSizeValidation={true}
                        maxFileSize='20MB'
                        imagePreviewMarkupShow={isPreview}
                        name="avatar" 
                        oninit={() => {
                            setIsPreview(true)
                        }}
                        onaddfile={(error,file) => {
                            setData(() => ({...data,avatar: file.getFileEncodeDataURL()}))
                        }}
                        labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse Avatar</span>'                  
                      />
                    </Grid>
                  </Grid> 
                </Grid>

                {
                  tags.length > 0 ?
                    <Grid item xs={12} md={6}>
                      <FormControl sx={{ m: 1, width: 300 }}>
                          <InputLabel id="tag-id-label">Select Tags</InputLabel>
                          <Select
                              multiple
                              value={selectedTags}
                              onChange={handleTagChange}
                              labelId="tag-id-label"
                              id="tag-id"
                              input={<OutlinedInput id="tags-chip" label="Tags" />}
                              renderValue={(selected) => (
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                  {selected.map((tagId, index) => (
                                  <Chip key={index} label={tags?.find(e => e.id === tagId).name} />
                                  ))}
                              </Box>
                              )}
                              MenuProps={MenuProps}
                          >
                              {
                                  
                                tags.map((tag) => (
                                  <MenuItem key={tag.id} value={tag.id}>
                                      <Checkbox checked={selectedTags.includes(tag.id)} />
                                      <ListItemText primary={tag.name} />
                                  </MenuItem>
                                  ))
                              }                      
                          </Select>
                      </FormControl>
                    </Grid> : <></>
                }

                <Grid item xs={12} md={12}>
                  <TextField 
                    id="description" 
                    label="Description" 
                    fullWidth
                    multiline
                    maxRows={5}
                    minRows={5}
                    value={data.description}
                    onChange={(e) => EnterTextField('description',e.target.value)}
                    variant="outlined" />
                </Grid>
                    
                <Grid item xs={12}>
                    {
                    loading ? <Button variant='contained' startIcon={<Add />} sx={{ float: 'right' }} disabled>{isEdit ? 'Update' : 'Create'}</Button>
                    : 
                    <Button variant='contained' startIcon={<Add />} sx={{ float: 'right' }} onClick={handleFormSubmit}>{isEdit ? 'Update' : 'Create'}</Button>
                    }
                </Grid>           
              </Grid>
            </CardContent>
          </Card>
      </Container>
    </>
  )
}

export default BlogManage