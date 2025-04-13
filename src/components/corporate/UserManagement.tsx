import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Grid,
  styled,
  Card,
  CardContent,
  Tooltip,
  Avatar,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Email as EmailIcon,
  WhatsApp as WhatsAppIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  AccessTime as AccessTimeIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  VpnKey as VpnKeyIcon,
} from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  minHeight: '100vh',
  maxWidth: '1600px',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100%',
}));

interface User {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  type: 'student' | 'employee';
  department?: string;
  grade?: string;
  status: 'active' | 'inactive';
  lastLogin?: {
    date: string;
    time: string;
  };
  lastLogout?: {
    date: string;
    time: string;
  };
  totalLoginHours: number;
  hasLoggedIn: boolean;
}

// Mock data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    userId: 'STU001',
    name: 'Alice Johnson',
    email: 'alice.j@student.com',
    phone: '+1 234-567-8901',
    type: 'student',
    grade: 'Grade 10',
    status: 'active',
    lastLogin: { date: '2024-03-15', time: '09:30 AM' },
    lastLogout: { date: '2024-03-15', time: '04:45 PM' },
    totalLoginHours: 7.25,
    hasLoggedIn: true,
  },
  {
    id: '2',
    userId: 'EMP001',
    name: 'John Smith',
    email: 'john.smith@corporate.com',
    phone: '+1 234-567-8902',
    type: 'employee',
    department: 'Engineering',
    status: 'active',
    lastLogin: { date: '2024-03-15', time: '08:00 AM' },
    lastLogout: { date: '2024-03-15', time: '06:00 PM' },
    totalLoginHours: 10,
    hasLoggedIn: true,
  },
  {
    id: '3',
    userId: 'STU002',
    name: 'Bob Wilson',
    email: 'bob.w@student.com',
    phone: '+1 234-567-8903',
    type: 'student',
    grade: 'Grade 11',
    status: 'active',
    lastLogin: { date: '2024-03-14', time: '10:15 AM' },
    lastLogout: { date: '2024-03-14', time: '03:30 PM' },
    totalLoginHours: 5.25,
    hasLoggedIn: true,
  },
  {
    id: '4',
    userId: 'EMP002',
    name: 'Sarah Johnson',
    email: 'sarah.j@corporate.com',
    phone: '+1 234-567-8904',
    type: 'employee',
    department: 'HR',
    status: 'active',
    lastLogin: { date: '2024-03-15', time: '09:00 AM' },
    lastLogout: { date: '2024-03-15', time: '05:30 PM' },
    totalLoginHours: 8.5,
    hasLoggedIn: true,
  },
  {
    id: '5',
    userId: 'STU003',
    name: 'Carol Davis',
    email: 'carol.d@student.com',
    phone: '+1 234-567-8905',
    type: 'student',
    grade: 'Grade 9',
    status: 'inactive',
    hasLoggedIn: false,
    totalLoginHours: 0,
  },
  {
    id: '6',
    userId: 'EMP003',
    name: 'Michael Brown',
    email: 'michael.b@corporate.com',
    phone: '+1 234-567-8906',
    type: 'employee',
    department: 'Finance',
    status: 'active',
    lastLogin: { date: '2024-03-15', time: '08:30 AM' },
    lastLogout: { date: '2024-03-15', time: '05:45 PM' },
    totalLoginHours: 9.25,
    hasLoggedIn: true,
  },
  {
    id: '7',
    userId: 'STU004',
    name: 'David Miller',
    email: 'david.m@student.com',
    phone: '+1 234-567-8907',
    type: 'student',
    grade: 'Grade 12',
    status: 'active',
    lastLogin: { date: '2024-03-14', time: '11:00 AM' },
    lastLogout: { date: '2024-03-14', time: '04:00 PM' },
    totalLoginHours: 5,
    hasLoggedIn: true,
  },
  {
    id: '8',
    userId: 'EMP004',
    name: 'Emily Wilson',
    email: 'emily.w@corporate.com',
    phone: '+1 234-567-8908',
    type: 'employee',
    department: 'Marketing',
    status: 'active',
    lastLogin: { date: '2024-03-15', time: '09:15 AM' },
    lastLogout: { date: '2024-03-15', time: '06:15 PM' },
    totalLoginHours: 9,
    hasLoggedIn: true,
  },
  {
    id: '9',
    userId: 'STU005',
    name: 'Eve Taylor',
    email: 'eve.t@student.com',
    phone: '+1 234-567-8909',
    type: 'student',
    grade: 'Grade 10',
    status: 'active',
    hasLoggedIn: false,
    totalLoginHours: 0,
  },
  {
    id: '10',
    userId: 'EMP005',
    name: 'James Anderson',
    email: 'james.a@corporate.com',
    phone: '+1 234-567-8910',
    type: 'employee',
    department: 'Operations',
    status: 'inactive',
    lastLogin: { date: '2024-03-10', time: '08:00 AM' },
    lastLogout: { date: '2024-03-10', time: '05:00 PM' },
    totalLoginHours: 9,
    hasLoggedIn: true,
  },
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'student' | 'employee'>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [resetting, setResetting] = useState(false);

  const handleResetPassword = (user: User) => {
    setSelectedUser(user);
    setResetDialogOpen(true);
  };

  const handleCloseResetDialog = () => {
    setResetDialogOpen(false);
    setSelectedUser(null);
    setResetting(false);
  };

  const handleConfirmReset = () => {
    if (!selectedUser) return;

    setResetting(true);
    // Simulate API call
    setTimeout(() => {
      setResetting(false);
      handleCloseResetDialog();
      // Show success message or update UI
    }, 1500);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.userId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || user.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <StyledPaper>
      <Box sx={{ maxWidth: '1400px', mx: 'auto', width: '100%' }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            User Management
          </Typography>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Search Users"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <PersonIcon sx={{ mr: 1, color: 'action.active' }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>User Type</InputLabel>
                <Select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as 'all' | 'student' | 'employee')}
                  label="User Type"
                >
                  <MenuItem value="all">All Users</MenuItem>
                  <MenuItem value="student">Students</MenuItem>
                  <MenuItem value="employee">Employees</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        <TableContainer sx={{ maxWidth: '100%', overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Last Login</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.userId}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2, bgcolor: user.type === 'student' ? 'primary.main' : 'secondary.main' }}>
                          {user.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body1">{user.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {user.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={user.type === 'student' ? <SchoolIcon /> : <WorkIcon />}
                        label={user.type === 'student' ? 'Student' : 'Employee'}
                        color={user.type === 'student' ? 'primary' : 'secondary'}
                      />
                    </TableCell>
                    <TableCell>
                      {user.type === 'student' ? (
                        <Typography>Grade: {user.grade}</Typography>
                      ) : (
                        <Typography>Department: {user.department}</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.status}
                        color={user.status === 'active' ? 'success' : 'error'}
                      />
                    </TableCell>
                    <TableCell>
                      {user.hasLoggedIn ? (
                        <Box>
                          <Typography variant="body2">
                            {user.lastLogin?.date} {user.lastLogin?.time}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Total Hours: {user.totalLoginHours}
                          </Typography>
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          Never logged in
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Reset Password">
                        <IconButton
                          onClick={() => handleResetPassword(user)}
                          color="primary"
                        >
                          <VpnKeyIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={resetDialogOpen} onClose={handleCloseResetDialog}>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogContent>
            {selectedUser && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" gutterBottom>
                  Are you sure you want to reset the password for:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ mr: 2, bgcolor: selectedUser.type === 'student' ? 'primary.main' : 'secondary.main' }}>
                    {selectedUser.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="body1">{selectedUser.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {selectedUser.email}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  A temporary password will be generated and the user will be required to change it on their next login.
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseResetDialog}>Cancel</Button>
            <Button
              onClick={handleConfirmReset}
              variant="contained"
              color="primary"
              disabled={resetting}
            >
              {resetting ? 'Resetting...' : 'Reset Password'}
            </Button>
          </DialogActions>
        </Dialog>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </StyledPaper>
  );
};

export default UserManagement; 