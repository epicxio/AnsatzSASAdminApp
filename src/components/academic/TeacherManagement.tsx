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
  OutlinedInput,
  Autocomplete,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  School as SchoolIcon,
} from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
}));

interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  assignedGrades: string[];
  subjects: string[];
  qualification: string;
  experience: string;
  status: 'active' | 'inactive';
  joiningDate: string;
  linkedStudents: { id: string; name: string; grade: string; section: string; rollNumber: string }[];
}

interface Student {
  id: string;
  name: string;
  grade: string;
  section: string;
  rollNumber: string;
}

// Mock data for demonstration
const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'Sarah Smith',
    email: 'sarah.smith@school.com',
    phone: '123-456-7890',
    assignedGrades: ['9', '10'],
    subjects: ['Mathematics', 'Physics'],
    qualification: 'M.Sc. Mathematics',
    experience: '5 years',
    status: 'active',
    joiningDate: '2023-01-15',
    linkedStudents: [],
  },
];

const availableStudents: Student[] = [
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
  {
    id: '3',
    name: 'Mike Johnson',
    grade: '11',
    section: 'C',
    rollNumber: '1003',
  },
];

const grades = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];

export const TeacherManagement: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState<string>('');

  const handleAddTeacher = () => {
    setSelectedTeacher(null);
    setOpenDialog(true);
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setOpenDialog(true);
  };

  const handleDeleteTeacher = (teacherId: string) => {
    setTeachers(teachers.filter(teacher => teacher.id !== teacherId));
  };

  const handleSaveTeacher = (teacherData: Partial<Teacher>) => {
    if (selectedTeacher) {
      // Edit existing teacher
      setTeachers(teachers.map(teacher =>
        teacher.id === selectedTeacher.id ? { ...teacher, ...teacherData } : teacher
      ));
    } else {
      // Add new teacher
      const newTeacher: Teacher = {
        id: Math.random().toString(36).substr(2, 9),
        name: '',
        email: '',
        phone: '',
        assignedGrades: [],
        subjects: [],
        qualification: '',
        experience: '',
        status: 'active',
        joiningDate: new Date().toISOString().split('T')[0],
        linkedStudents: [],
        ...teacherData,
      };
      setTeachers([...teachers, newTeacher]);
    }
    setOpenDialog(false);
  };

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = 
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = !filterGrade || teacher.assignedGrades.includes(filterGrade);
    return matchesSearch && matchesGrade;
  });

  return (
    <Box>
      <StyledPaper>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h2">
            Teacher Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddTeacher}
          >
            Add Teacher
          </Button>
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search teachers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Filter by Grade</InputLabel>
              <Select
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
                label="Filter by Grade"
              >
                <MenuItem value="">All Grades</MenuItem>
                {grades.map((grade) => (
                  <MenuItem key={grade} value={grade}>Grade {grade}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Assigned Grades</TableCell>
                <TableCell>Subjects</TableCell>
                <TableCell>Experience</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Linked Students</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {teacher.assignedGrades.map((grade) => (
                        <Chip
                          key={grade}
                          label={`Grade ${grade}`}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {teacher.subjects.map((subject) => (
                        <Chip
                          key={subject}
                          label={subject}
                          size="small"
                          color="secondary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>{teacher.experience}</TableCell>
                  <TableCell>
                    <Chip
                      label={teacher.status}
                      color={teacher.status === 'active' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {teacher.linkedStudents.map((student) => (
                        <Chip
                          key={student.id}
                          icon={<SchoolIcon />}
                          label={`${student.name} (Grade ${student.grade}-${student.section}, Roll: ${student.rollNumber})`}
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditTeacher(teacher)} size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteTeacher(teacher.id)} size="small">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledPaper>

      <TeacherDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleSaveTeacher}
        teacher={selectedTeacher}
      />
    </Box>
  );
};

interface TeacherDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (teacherData: Partial<Teacher>) => void;
  teacher: Teacher | null;
}

const TeacherDialog: React.FC<TeacherDialogProps> = ({
  open,
  onClose,
  onSave,
  teacher,
}) => {
  const [formData, setFormData] = useState<Partial<Teacher>>(
    teacher || {
      name: '',
      email: '',
      phone: '',
      assignedGrades: [],
      subjects: [],
      qualification: '',
      experience: '',
      status: 'active',
      joiningDate: new Date().toISOString().split('T')[0],
      linkedStudents: [],
    }
  );

  React.useEffect(() => {
    setFormData(teacher || {
      name: '',
      email: '',
      phone: '',
      assignedGrades: [],
      subjects: [],
      qualification: '',
      experience: '',
      status: 'active',
      joiningDate: new Date().toISOString().split('T')[0],
      linkedStudents: [],
    });
  }, [teacher]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {teacher ? 'Edit Teacher' : 'Add New Teacher'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Teacher Name"
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
              <FormControl fullWidth required>
                <InputLabel>Assigned Grades</InputLabel>
                <Select
                  multiple
                  value={formData.assignedGrades || []}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    assignedGrades: typeof e.target.value === 'string' 
                      ? e.target.value.split(',') 
                      : e.target.value 
                  })}
                  input={<OutlinedInput label="Assigned Grades" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={`Grade ${value}`} />
                      ))}
                    </Box>
                  )}
                >
                  {grades.map((grade) => (
                    <MenuItem key={grade} value={grade}>
                      Grade {grade}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Subjects</InputLabel>
                <Select
                  multiple
                  value={formData.subjects || []}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    subjects: typeof e.target.value === 'string' 
                      ? e.target.value.split(',') 
                      : e.target.value 
                  })}
                  input={<OutlinedInput label="Subjects" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {subjects.map((subject) => (
                    <MenuItem key={subject} value={subject}>
                      {subject}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Qualification"
                value={formData.qualification || ''}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Experience"
                value={formData.experience || ''}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                required
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
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Joining Date"
                type="date"
                value={formData.joiningDate || ''}
                onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {teacher ? 'Save Changes' : 'Add Teacher'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TeacherManagement; 