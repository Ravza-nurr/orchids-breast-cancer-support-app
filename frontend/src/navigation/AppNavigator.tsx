import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

// Main Screens
import HomeScreen from '../screens/HomeScreen';
import SymptomListScreen from '../screens/symptoms/SymptomListScreen';
import SymptomDetailScreen from '../screens/symptoms/SymptomDetailScreen';
import AskExpertScreen from '../screens/expert/AskExpertScreen';
import AskExpertTextScreen from '../screens/expert/AskExpertTextScreen';
import AskExpertVoiceScreen from '../screens/expert/AskExpertVoiceScreen';
import PatientExperiencesScreen from '../screens/experiences/PatientExperiencesScreen';
import PatientExperienceDetailScreen from '../screens/experiences/PatientExperienceDetailScreen';
import UploadBloodTestScreen from '../screens/UploadBloodTestScreen';
import SymptomCalendarScreen from '../screens/SymptomCalendarScreen';
import ContactScreen from '../screens/ContactScreen';
import AboutScreen from '../screens/AboutScreen';
import Covid19Screen from '../screens/Covid19Screen';
import BreastCancerInfoScreen from '../screens/BreastCancerInfoScreen';
import MedicationReminderScreen from '../screens/MedicationReminderScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  SymptomList: undefined;
  SymptomDetail: { symptomId: string };
  AskExpert: undefined;
  AskExpertText: undefined;
  AskExpertVoice: undefined;
  PatientExperiences: undefined;
  PatientExperienceDetail: { experienceId: string };
  UploadBloodTest: undefined;
  SymptomCalendar: undefined;
  Contact: undefined;
  About: undefined;
  Covid19: undefined;
  BreastCancerInfo: undefined;
  MedicationReminder: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SymptomList" component={SymptomListScreen} />
          <Stack.Screen name="SymptomDetail" component={SymptomDetailScreen} />
          <Stack.Screen name="AskExpert" component={AskExpertScreen} />
          <Stack.Screen name="AskExpertText" component={AskExpertTextScreen} />
          <Stack.Screen name="AskExpertVoice" component={AskExpertVoiceScreen} />
          <Stack.Screen name="PatientExperiences" component={PatientExperiencesScreen} />
          <Stack.Screen name="PatientExperienceDetail" component={PatientExperienceDetailScreen} />
          <Stack.Screen name="UploadBloodTest" component={UploadBloodTestScreen} />
          <Stack.Screen name="SymptomCalendar" component={SymptomCalendarScreen} />
          <Stack.Screen name="Contact" component={ContactScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
          <Stack.Screen name="Covid19" component={Covid19Screen} />
          <Stack.Screen name="BreastCancerInfo" component={BreastCancerInfoScreen} />
          <Stack.Screen name="MedicationReminder" component={MedicationReminderScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
