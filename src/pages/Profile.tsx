
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Syringe,
  LogOut,
  Edit
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Profile: React.FC = () => {
  const { user, isAuthenticated, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user || {});
  
  // Redirect if not logged in
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);
  
  if (!user) return null;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(editedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/auth');
  };
  
  return (
    <Layout>
      <div className="container max-w-lg mx-auto px-4 py-6">
        <div className="mb-6 flex flex-col items-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-lg bg-pandemic-blue text-white">
              {user.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>
        
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
              <Input
                id="name"
                name="name"
                value={editedUser.name || ''}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={editedUser.email || ''}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
              <Input
                id="phone"
                name="phone"
                value={editedUser.phone || ''}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
              <Input
                id="address"
                name="address"
                value={editedUser.address || ''}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="dob" className="block text-sm font-medium mb-1">Date of Birth</label>
              <Input
                id="dob"
                name="dob"
                type="date"
                value={editedUser.dob || ''}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="healthStatus" className="block text-sm font-medium mb-1">Health Status</label>
              <select
                id="healthStatus"
                name="healthStatus"
                value={editedUser.healthStatus || 'normal'}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="normal">Normal</option>
                <option value="at-risk">At Risk</option>
                <option value="infected">Infected</option>
                <option value="recovered">Recovered</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="vaccinationStatus" className="block text-sm font-medium mb-1">Vaccination Status</label>
              <select
                id="vaccinationStatus"
                name="vaccinationStatus"
                value={editedUser.vaccinationStatus || 'none'}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="none">None</option>
                <option value="partial">Partially Vaccinated</option>
                <option value="fully-vaccinated">Fully Vaccinated</option>
                <option value="boosted">Boosted</option>
              </select>
            </div>
            
            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">Save Changes</Button>
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-border p-4 space-y-4">
              <h2 className="font-semibold text-lg">Personal Information</h2>
              
              <div className="flex items-center gap-3">
                <User className="text-muted-foreground" size={18} />
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p>{user.name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="text-muted-foreground" size={18} />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="text-muted-foreground" size={18} />
                <div>
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p>{user.phone || 'Not provided'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="text-muted-foreground" size={18} />
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p>{user.address || 'Not provided'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="text-muted-foreground" size={18} />
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p>{user.dob || 'Not provided'}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-border p-4 space-y-4">
              <h2 className="font-semibold text-lg">Health Information</h2>
              
              <div className="flex items-center gap-3">
                <Shield className="text-muted-foreground" size={18} />
                <div>
                  <p className="text-sm text-muted-foreground">Health Status</p>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.healthStatus === 'normal' ? 'bg-green-100 text-green-800' :
                    user.healthStatus === 'at-risk' ? 'bg-yellow-100 text-yellow-800' :
                    user.healthStatus === 'infected' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {user.healthStatus === 'normal' ? 'Normal' :
                     user.healthStatus === 'at-risk' ? 'At Risk' :
                     user.healthStatus === 'infected' ? 'Infected' :
                     user.healthStatus === 'recovered' ? 'Recovered' : 'Unknown'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Syringe className="text-muted-foreground" size={18} />
                <div>
                  <p className="text-sm text-muted-foreground">Vaccination Status</p>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.vaccinationStatus === 'none' ? 'bg-red-100 text-red-800' :
                    user.vaccinationStatus === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                    user.vaccinationStatus === 'fully-vaccinated' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {user.vaccinationStatus === 'none' ? 'None' :
                     user.vaccinationStatus === 'partial' ? 'Partially Vaccinated' :
                     user.vaccinationStatus === 'fully-vaccinated' ? 'Fully Vaccinated' :
                     user.vaccinationStatus === 'boosted' ? 'Boosted' : 'Unknown'}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button 
                onClick={() => setIsEditing(true)} 
                className="flex-1 bg-pandemic-blue hover:bg-pandemic-blue/90 text-white"
              >
                <Edit className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
              <Button 
                onClick={handleLogout} 
                variant="outline" 
                className="flex-1 text-red-500 hover:text-red-600 border-red-200 hover:border-red-300"
              >
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
