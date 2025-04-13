import { Box, Typography, Container, Grid, styled, TextField, Button, ToggleButton, ToggleButtonGroup, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { School, Business, Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

// Logo image import
import ansatzLogo from '../../assets/ansatz-logo.png';

const SplitContainer = styled(Container)`
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  padding: 2rem;
`;

const LeftSection = styled(Box)`
  background: linear-gradient(135deg, rgba(108, 99, 255, 0.1), rgba(108, 99, 255, 0.05));
  border-radius: 24px;
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://source.unsplash.com/random/800x600?math,equation') center/cover;
    opacity: 0.05;
    z-index: 0;
  }
`;

const LogoContainer = styled(Box)`
  position: relative;
  z-index: 1;
  width: 200px;
  height: 200px;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const RightSection = styled(Box)`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SignUpForm = styled(Box)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 1rem;
  & .MuiOutlinedInput-root {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
  }
`;

const SignUpButton = styled(Button)`
  padding: 1rem;
  border-radius: 12px;
  text-transform: none;
  font-size: 1.1rem;
  width: 100%;
  margin-top: 1rem;
  background: #6C63FF;
  color: white;
  border: none;

  &:hover {
    background: #5A52D9;
  }
`;

const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  width: 100%;
  margin-bottom: 2rem;
  & .MuiToggleButton-root {
    flex: 1;
    padding: 1rem;
    border-color: rgba(108, 99, 255, 0.3);
    color: #6C63FF;
    
    &.Mui-selected {
      background: linear-gradient(45deg, rgba(108, 99, 255, 0.1), rgba(108, 99, 255, 0.05));
      color: #6C63FF;
    }

    &:hover {
      background: rgba(108, 99, 255, 0.05);
    }
  }
`;

const TopBar = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 100;
  pointer-events: auto;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(20px);
    z-index: -1;
  }
`;

const TopBarLogo = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    height: 40px;
    width: auto;
  }
`;

const LoginButton = styled(Button)`
  background: #6C63FF;
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 12px;
  text-transform: none;
  font-weight: bold;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: #5A52D9;
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(108, 99, 255, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const MainContent = styled(Box)`
  padding-top: 80px;
  min-height: calc(100vh - 80px);
  position: relative;
  z-index: 1;
`;

const RootContainer = styled(Box)`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(108, 99, 255, 0.05), rgba(108, 99, 255, 0.02));
  overflow-x: hidden;
  overflow-y: auto;

  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    width: 12px;
    background: transparent;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }

  &::-webkit-scrollbar-thumb {
    background: #6C63FF;
    border-radius: 6px;
    border: 3px solid transparent;
    background-clip: content-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #5A52D9;
  }
`;

const LoginDialog = styled(Dialog)`
  .MuiDialog-paper {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    padding: 16px;
  }
`;

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  organizationName: string;
}

interface LoginFormData {
  email: string;
  password: string;
  showPassword: boolean;
}

export const Home = () => {
  console.log('Home component rendering');
  const { signup, login } = useAuth();
  const navigate = useNavigate();
  const [adminType, setAdminType] = useState<'school' | 'corporate'>('school');
  const [formData, setFormData] = useState<SignUpFormData>({
    name: '',
    email: '',
    password: '',
    organizationName: '',
  });
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    showPassword: false,
  });
  const [error, setError] = useState('');
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    console.log('Home component mounted');
    // Preload the logo
    const img = new Image();
    img.src = ansatzLogo;
    img.onerror = () => {
      console.error('Failed to load logo');
      setLogoError(true);
    };
  }, []);

  const handleAdminTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newAdminType: 'school' | 'corporate',
  ) => {
    if (newAdminType !== null) {
      setAdminType(newAdminType);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await signup({
        ...formData,
        adminType,
      });
    } catch (err) {
      setError('Failed to sign up. Please try again.');
      console.error('Signup error:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(loginFormData.email, loginFormData.password);
      setLoginDialogOpen(false);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleClickShowPassword = () => {
    setLoginFormData({
      ...loginFormData,
      showPassword: !loginFormData.showPassword,
    });
  };

  return (
    <RootContainer>
      <TopBar>
        <TopBarLogo>
          {!logoError ? (
            <img src={ansatzLogo} alt="Ansatz Logo" onError={() => setLogoError(true)} />
          ) : (
            <Typography variant="h5" sx={{ color: '#FF4081' }}>A</Typography>
          )}
          <Typography variant="h6">Ansatz</Typography>
        </TopBarLogo>
        <LoginButton onClick={() => setLoginDialogOpen(true)}>
          Sign In
        </LoginButton>
      </TopBar>

      <MainContent>
        <SplitContainer>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <LeftSection>
                <LogoContainer>
                  {!logoError ? (
                    <img src={ansatzLogo} alt="Ansatz Logo" onError={() => setLogoError(true)} />
                  ) : (
                    <Typography variant="h1" sx={{ color: '#FF4081' }}>A</Typography>
                  )}
                </LogoContainer>
                <Typography variant="h3" component="h1" align="center" gutterBottom sx={{ position: 'relative', zIndex: 1 }}>
                  Welcome to Ansatz
                </Typography>
                <Typography variant="h6" align="center" sx={{ position: 'relative', zIndex: 1, opacity: 0.8 }}>
                  Empowering mathematics education through innovative solutions
                </Typography>
              </LeftSection>
            </Grid>

            <Grid item xs={12} md={6}>
              <RightSection>
                <SignUpForm>
                  <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', color: '#6C63FF' }}>
                    Administrator Sign Up
                  </Typography>
                  
                  {error && (
                    <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
                      {error}
                    </Typography>
                  )}
                  
                  <StyledToggleButtonGroup
                    value={adminType}
                    exclusive
                    onChange={handleAdminTypeChange}
                    aria-label="administrator type"
                  >
                    <ToggleButton value="school" aria-label="school administrator">
                      <School sx={{ mr: 1 }} />
                      School
                    </ToggleButton>
                    <ToggleButton value="corporate" aria-label="corporate administrator">
                      <Business sx={{ mr: 1 }} />
                      Corporate
                    </ToggleButton>
                  </StyledToggleButtonGroup>

                  <form onSubmit={handleSubmit}>
                    <StyledTextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <StyledTextField
                      fullWidth
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <StyledTextField
                      fullWidth
                      label="Password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <StyledTextField
                      fullWidth
                      label={adminType === 'school' ? 'School Name' : 'Company Name'}
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={handleChange}
                      required
                    />
                    <SignUpButton type="submit" variant="contained">
                      Sign Up as {adminType === 'school' ? 'School' : 'Corporate'} Administrator
                    </SignUpButton>
                  </form>
                </SignUpForm>
              </RightSection>
            </Grid>
          </Grid>
        </SplitContainer>
      </MainContent>

      <LoginDialog
        open={loginDialogOpen}
        onClose={() => setLoginDialogOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <form onSubmit={handleLogin}>
          <DialogTitle>
            <Typography variant="h5" align="center" sx={{ color: '#6C63FF', fontWeight: 'bold' }}>
              Welcome Back
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <StyledTextField
                fullWidth
                label="Email"
                type="email"
                value={loginFormData.email}
                onChange={(e) => setLoginFormData({ ...loginFormData, email: e.target.value })}
                required
                error={!!error}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: '#6C63FF' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <StyledTextField
                fullWidth
                label="Password"
                type={loginFormData.showPassword ? 'text' : 'password'}
                value={loginFormData.password}
                onChange={(e) => setLoginFormData({ ...loginFormData, password: e.target.value })}
                required
                error={!!error}
                helperText={error}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#6C63FF' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {loginFormData.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                background: '#6C63FF',
                color: 'white',
                borderRadius: '12px',
                padding: '12px',
                '&:hover': {
                  background: '#5A52D9',
                },
              }}
            >
              Sign In
            </Button>
          </DialogActions>
        </form>
      </LoginDialog>
    </RootContainer>
  );
}; 