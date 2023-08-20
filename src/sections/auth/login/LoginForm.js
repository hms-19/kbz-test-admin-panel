import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { userLogin } from 'src/endpoints/auth';
import { useCookies } from 'react-cookie';
import Swal from 'sweetalert2';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [cookies, setCookie] = useCookies(["token","user"]);

  // original state
  const [data, setData] = useState({
    email : '',
    password: ''
  })

  // state update
  const EnterTextField = (key, value) => {
    setData({...data, [key]: value})
  }

  const handleClick = async () => {
      if(data.email !== '' && data.password !== ''){
        setIsLoading(true)
        const res = await userLogin({
          email: data.email,
          password: data.password
        })
        setIsLoading(false)

        if(res?.data?.success){
          
          setCookie("token", res?.data?.token, {
            path: "/",expires: new Date(Date.now() + 86400e3)
          });

          setCookie("user", JSON.stringify(res?.data?.data?.user), {
            path: "/",expires: new Date(Date.now() + 86400e3)
          });

          setData({
            email: '',
            password: ''
          })
          navigate('/home')
        }
        else{
          Swal.fire({
            title: 'Warning!',
            text: res?.data?.errors[0],
            icon: 'warning',
            confirmButtonText: 'OK'
          })
        }
      }
      else{
        Swal.fire({
          title: 'Warning!',
          text: 'All Fields are required !',
          icon: 'warning',
          confirmButtonText: 'OK'
        })
      }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField 
          value={data.email}
          onChange={(e) => EnterTextField("email",e.target.value)}
          name="email" 
          label="Email address" />

        <TextField
          name="password"
          label="Password"
          value={data.password}
          onChange={(e) => EnterTextField("password",e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link to='/' variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}

      {
        isLoading ?
        <LoadingButton fullWidth size="large" type="submit" sx={{ mt: 3 }} variant="contained" disabled>
          Login
        </LoadingButton>
        : <LoadingButton fullWidth size="large" type="submit" sx={{ mt: 3 }} variant="contained" onClick={handleClick}>
          Login
        </LoadingButton>
      }
    </>
  );
}
