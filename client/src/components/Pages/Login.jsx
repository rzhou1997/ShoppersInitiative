import React, {useState} from 'react'
import styled from 'styled-components'
import axiosInstance from "../Utilities/config"
const Container = styled.div`
  max-width: 500px;
  border: 2px solid rgb(3, 165, 206);
  border-radius: 5px;
  padding: 30px;
  margin: 50px auto;
  
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Input = styled.input`
  width: 435px;
  height: 40px;
  margin: 10px 0;
  padding: 0 5px;
  outline: rgb(3, 165, 206);
  border: 1px solid rgb(3, 165, 206);
`;
const Button = styled.button`
  background-color:gray;
  width: 100%;
  height: 40px;
  margin: 10px 0;
  padding: 0 5px;
  outline: rgb(3, 165, 206);
  border: 1px solid rgb(3, 165, 206);
`;
const Title = styled.h1`
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #555;
`;
const Span = styled.span`
  cursor: pointer;
  margin-left:140px;
`;
const AuthWrapper = styled.div`
    justify-content: space-between;
    align-items: center;
`;


const Login = () => {
    const [user, setUser] = useState({
        name: '',email:'', password: ''
    })

    const [isSignUp, setIsSignUp] = useState(true);
    const switchMode = () => {
      setIsSignUp((prevIsSignup) => !prevIsSignup);
    }

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(isSignUp){
            try {
                await axiosInstance.post('/user/login', {...user})
                localStorage.setItem('firstLogin', true)
                window.location.href = "/";
            } catch (err) {
                alert(err.response.data.msg)
            }
        }else if(!isSignUp){
            try {
                await axiosInstance.post('/user/register', {...user})
                localStorage.setItem('firstLogin', true)
                window.location.href = "/";
            } catch (err) {
                alert(err.response.data.msg)
            }
        }
    }

    return (
        <Container>
            <Title>{isSignUp ? 'Sign In' : 'Sign Up'}</Title>
            <Form onSubmit={handleSubmit}>
                {isSignUp && (
                    <AuthWrapper>
                        <Input type="email" name="email" required placeholder="Email" value={user.email} onChange={onChangeInput} />
                        <Input type="password" name="password" required autoComplete="on" placeholder="Password" value={user.password} onChange={onChangeInput} />
                    </AuthWrapper>
                )}
                {!isSignUp && (
                    <AuthWrapper>
                        <Input type="text" name="name" required placeholder="Name" value={user.name} onChange={onChangeInput} />
                        <Input type="email" name="email" required placeholder="Email" value={user.email} onChange={onChangeInput} />
                        <Input type="password" name="password" required autoComplete="on" placeholder="Password" value={user.password} onChange={onChangeInput} />
                    </AuthWrapper>
                )}

                
                <Button type="submit">{isSignUp ? 'Login' : 'Register'}</Button>
                <br/>
                <Span onClick={switchMode}>{isSignUp ? "Don't have an account?" : "Already have an account?"}</Span>
                
            </Form>
        </Container>
    )
}

export default Login
