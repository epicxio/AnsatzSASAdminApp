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
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
}));

interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  section: string;
  rollNumber: string;
  parentName: string;
  parentEmail: string;
  status: 'active' | 'inactive';
}

// Mock data for demonstration
const mockStudents: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    grade: '10',
    section: 'A',
    rollNumber: '1001',
    parentName: 'Mike Doe',
    parentEmail: 'mike.doe@example.com',
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    grade: '9',
    section: 'B',
    rollNumber: '1002',
    parentName: 'Sarah Johnson',
    parentEmail: 'sarah.j@example.com',
    status: 'active',
  },
  {
    id: '3',
    name: 'Michael Johnson',
    email: 'michael.j@example.com',
    grade: '11',
    section: 'C',
    rollNumber: '1003',
    parentName: 'Robert Williams',
    parentEmail: 'robert.w@example.com',
    status: 'active',
  },
  {
    id: '4',
    name: 'Emily Brown',
    email: 'emily.b@example.com',
    grade: '8',
    section: 'A',
    rollNumber: '1004',
    parentName: 'Emily Brown Sr',
    parentEmail: 'emily.b.sr@example.com',
    status: 'active',
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david.w@example.com',
    grade: '12',
    section: 'B',
    rollNumber: '1005',
    parentName: 'David Wilson Sr',
    parentEmail: 'david.w.sr@example.com',
    status: 'active',
  },
  {
    id: '6',
    name: 'Sarah Davis',
    email: 'sarah.d@example.com',
    grade: '10',
    section: 'C',
    rollNumber: '1006',
    parentName: 'Jennifer Davis',
    parentEmail: 'jennifer.d@example.com',
    status: 'active',
  },
  {
    id: '7',
    name: 'Robert Miller',
    email: 'robert.m@example.com',
    grade: '9',
    section: 'A',
    rollNumber: '1007',
    parentName: 'Michael Wilson',
    parentEmail: 'michael.w@example.com',
    status: 'active',
  },
  {
    id: '8',
    name: 'Lisa Anderson',
    email: 'lisa.a@example.com',
    grade: '11',
    section: 'B',
    rollNumber: '1008',
    parentName: 'Lisa Anderson Sr',
    parentEmail: 'lisa.a.sr@example.com',
    status: 'active',
  },
  {
    id: '9',
    name: 'James Taylor',
    email: 'james.t@example.com',
    grade: '8',
    section: 'C',
    rollNumber: '1009',
    parentName: 'James Taylor Sr',
    parentEmail: 'james.t.sr@example.com',
    status: 'active',
  },
  {
    id: '10',
    name: 'Patricia Moore',
    email: 'patricia.m@example.com',
    grade: '12',
    section: 'A',
    rollNumber: '1010',
    parentName: 'Patricia Moore Sr',
    parentEmail: 'patricia.m.sr@example.com',
    status: 'active',
  }
];

const grades = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const sections = ['A', 'B', 'C', 'D'];

export const StudentManagement: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState<string>('');

  const handleAddStudent = () => {
    setSelectedStudent(null);
    setOpenDialog(true);
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setOpenDialog(true);
  };

  const handleDeleteStudent = (studentId: string) => {
    setStudents(students.filter(student => student.id !== studentId));
  };

  const handleSaveStudent = (studentData: Partial<Student>) => {
    if (selectedStudent) {
      // Edit existing student
      setStudents(students.map(student =>
        student.id === selectedStudent.id ? { ...student, ...studentData } : student
      ));
    } else {
      // Add new student
      const newStudent: Student = {
        id: Math.random().toString(36).substr(2, 9),
        name: '',
        email: '',
        grade: '',
        section: '',
        rollNumber: '',
        parentName: '',
        parentEmail: '',
        status: 'active',
        ...studentData,
      };
      setStudents([...students, newStudent]);
    }
    setOpenDialog(false);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = !filterGrade || student.grade === filterGrade;
    return matchesSearch && matchesGrade;
  });

  return (
    <Box>
      <StyledPaper>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h2">
            Student Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddStudent}
          >
            Add Student
          </Button>
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search students..."
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
                <TableCell>Grade</TableCell>
                <TableCell>Section</TableCell>
                <TableCell>Roll Number</TableCell>
                <TableCell>Parent Name</TableCell>
                <TableCell>Parent Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>{student.section}</TableCell>
                  <TableCell>{student.rollNumber}</TableCell>
                  <TableCell>{student.parentName}</TableCell>
                  <TableCell>{student.parentEmail}</TableCell>
                  <TableCell>
                    <Chip
                      label={student.status}
                      color={student.status === 'active' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditStudent(student)} size="small">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteStudent(student.id)} size="small">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledPaper>

      <StudentDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onSave={handleSaveStudent}
        student={selectedStudent}
      />
    </Box>
  );
};

interface StudentDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (studentData: Partial<Student>) => void;
  student: Student | null;
}

const StudentDialog: React.FC<StudentDialogProps> = ({
  open,
  onClose,
  onSave,
  student,
}) => {
  const [formData, setFormData] = useState<Partial<Student>>(
    student || {
      name: '',
      email: '',
      grade: '',
      section: '',
      rollNumber: '',
      parentName: '',
      parentEmail: '',
      status: 'active',
    }
  );

  React.useEffect(() => {
    setFormData(student || {
      name: '',
      email: '',
      grade: '',
      section: '',
      rollNumber: '',
      parentName: '',
      parentEmail: '',
      status: 'active',
    });
  }, [student]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {student ? 'Edit Student' : 'Add New Student'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Student Name"
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
              <FormControl fullWidth required>
                <InputLabel>Grade</InputLabel>
                <Select
                  value={formData.grade || ''}
                  label="Grade"
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                >
                  {grades.map((grade) => (
                    <MenuItem key={grade} value={grade}>Grade {grade}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Section</InputLabel>
                <Select
                  value={formData.section || ''}
                  label="Section"
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                >
                  {sections.map((section) => (
                    <MenuItem key={section} value={section}>Section {section}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Roll Number"
                value={formData.rollNumber || ''}
                onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
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
                label="Parent Name"
                value={formData.parentName || ''}
                onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Parent Email"
                type="email"
                value={formData.parentEmail || ''}
                onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {student ? 'Save Changes' : 'Add Student'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StudentManagement; 