import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Grid,
  styled,
  Autocomplete,
  Card,
  CardContent,
  Tooltip,
  Avatar,
  Divider,
  Badge,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Link as LinkIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  CheckCircle as CheckCircleIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
  },
}));

interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  occupation: string;
  linkedStudents: Student[];
  status: 'active' | 'inactive';
}

interface Student {
  id: string;
  name: string;
  grade: string;
  section: string;
  rollNumber: string;
}

// Mock data for demonstration
const mockStudents: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    grade: '10',
    section: 'A',
    rollNumber: '1001',
  },
  {
    id: '2',
    name: 'Jane Smith',
    grade: '9',
    section: 'B',
    rollNumber: '1002',
  },
];

const mockParents: Parent[] = [
  {
    id: '1',
    name: 'Mike Doe',
    email: 'mike.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, City',
    occupation: 'Engineer',
    linkedStudents: [mockStudents[0]],
    status: 'active',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '234-567-8901',
    address: '456 Oak Ave, Town',
    occupation: 'Doctor',
    linkedStudents: [mockStudents[1]],
    status: 'active',
  },
  {
    id: '3',
    name: 'Robert Williams',
    email: 'robert.w@example.com',
    phone: '345-678-9012',
    address: '789 Pine Rd, Village',
    occupation: 'Teacher',
    linkedStudents: [],
    status: 'active',
  },
  {
    id: '4',
    name: 'Emily Brown',
    email: 'emily.b@example.com',
    phone: '456-789-0123',
    address: '321 Elm St, City',
    occupation: 'Lawyer',
    linkedStudents: [],
    status: 'active',
  },
  {
    id: '5',
    name: 'David Miller',
    email: 'david.m@example.com',
    phone: '567-890-1234',
    address: '654 Maple Dr, Town',
    occupation: 'Architect',
    linkedStudents: [],
    status: 'active',
  },
  {
    id: '6',
    name: 'Jennifer Davis',
    email: 'jennifer.d@example.com',
    phone: '678-901-2345',
    address: '987 Cedar Ln, Village',
    occupation: 'Accountant',
    linkedStudents: [],
    status: 'active',
  },
  {
    id: '7',
    name: 'Michael Wilson',
    email: 'michael.w@example.com',
    phone: '789-012-3456',
    address: '147 Birch St, City',
    occupation: 'Software Developer',
    linkedStudents: [],
    status: 'active',
  },
  {
    id: '8',
    name: 'Lisa Anderson',
    email: 'lisa.a@example.com',
    phone: '890-123-4567',
    address: '258 Spruce Ave, Town',
    occupation: 'Marketing Manager',
    linkedStudents: [],
    status: 'active',
  },
  {
    id: '9',
    name: 'James Taylor',
    email: 'james.t@example.com',
    phone: '901-234-5678',
    address: '369 Willow Rd, Village',
    occupation: 'Business Analyst',
    linkedStudents: [],
    status: 'active',
  },
  {
    id: '10',
    name: 'Patricia Moore',
    email: 'patricia.m@example.com',
    phone: '012-345-6789',
    address: '741 Oak St, City',
    occupation: 'HR Manager',
    linkedStudents: [],
    status: 'active',
  }
];

export const ParentManagement: React.FC = () => {
  const [parents, setParents] = useState<Parent[]>(mockParents);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddParent = () => {
    setSelectedParent(null);
    setOpenDialog(true);
  };

  const handleEditParent = (parent: Parent) => {
    setSelectedParent(parent);
    setOpenDialog(true);
  };

  const handleDeleteParent = (parentId: string) => {
    setParents(parents.filter(parent => parent.id !== parentId));
  };

  const handleSaveParent = (parentData: Partial<Parent>) => {
    if (selectedParent) {
      setParents(parents.map(parent =>
        parent.id === selectedParent.id ? { ...parent, ...parentData } : parent
      ));
    } else {
      const newParent: Parent = {
        id: Math.random().toString(36).substr(2, 9),
        name: '',
        email: '',
        phone: '',
        address: '',
        occupation: '',
        linkedStudents: [],
        status: 'active',
        ...parentData,
      };
      setParents([...parents, newParent]);
    }
    setOpenDialog(false);
  };

  const filteredParents = parents.filter(parent =>
    parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.linkedStudents.some(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Box>
      <StyledPaper>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h2">
            Parent Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddParent}
          >
            Add Parent
          </Button>
        </Box>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search parents or students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
          sx={{ mb: 3 }}
        />

        <Grid container spacing={3}>
          {filteredParents.map((parent) => (
            <Grid item xs={12} md={6} lg={4} key={parent.id}>
              <StyledCard>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      {parent.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{parent.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {parent.occupation}
                      </Typography>
                    </Box>
                    <Box sx={{ ml: 'auto' }}>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleEditParent(parent)} size="small">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDeleteParent(parent.id)} size="small">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EmailIcon sx={{ mr: 1, fontSize: 'small', color: 'text.secondary' }} />
                    <Typography variant="body2">{parent.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PhoneIcon sx={{ mr: 1, fontSize: 'small', color: 'text.secondary' }} />
                    <Typography variant="body2">{parent.phone}</Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Linked Students
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {parent.linkedStudents.map((student) => (
                      <Chip
                        key={student.id}
                        icon={<SchoolIcon />}
                        label={`${student.name} (Grade ${student.grade}-${student.section}, Roll: ${student.rollNumber})`}
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>

                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip
                      label={parent.status}
                      color={parent.status === 'active' ? 'success' : 'default'}
                      size="small"
                    />
                    <Badge
                      badgeContent={parent.linkedStudents.length}
                      color="primary"
                      sx={{ '& .MuiBadge-badge': { fontSize: '0.8rem' } }}
                    >
                      <LinkIcon color="action" />
                    </Badge>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </StyledPaper>

      <ParentDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleSaveParent}
        parent={selectedParent}
        availableStudents={mockStudents}
      />
    </Box>
  );
};

interface ParentDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (parentData: Partial<Parent>) => void;
  parent: Parent | null;
  availableStudents: Student[];
}

const ParentDialog: React.FC<ParentDialogProps> = ({
  open,
  onClose,
  onSave,
  parent,
  availableStudents,
}) => {
  const [formData, setFormData] = useState<Partial<Parent>>(
    parent || {
      name: '',
      email: '',
      phone: '',
      address: '',
      occupation: '',
      linkedStudents: [],
      status: 'active',
    }
  );

  React.useEffect(() => {
    setFormData(parent || {
      name: '',
      email: '',
      phone: '',
      address: '',
      occupation: '',
      linkedStudents: [],
      status: 'active',
    });
  }, [parent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {parent ? 'Edit Parent' : 'Add New Parent'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Parent Name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Occupation"
                value={formData.occupation || ''}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                value={formData.address || ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                options={availableStudents}
                getOptionLabel={(option) => `${option.name} (Grade ${option.grade}-${option.section}, Roll: ${option.rollNumber})`}
                value={formData.linkedStudents || []}
                onChange={(_, newValue) => setFormData({ ...formData, linkedStudents: newValue })}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Link Students"
                    required
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      icon={<SchoolIcon />}
                      label={`${option.name} (Grade ${option.grade}-${option.section}, Roll: ${option.rollNumber})`}
                      {...getTagProps({ index })}
                    />
                  ))
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status || 'active'}
                  label="Status"
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {parent ? 'Save Changes' : 'Add Parent'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ParentManagement; 