import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TextInput, 
  Alert, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import { API_BASE_URL } from '@env';
import { useSelector } from 'react-redux'; 
import Checkbox from '../components/Checkbox'; 

const ProfilEdit = () => {
  const navigation = useNavigation();
  
  const user = useSelector((state) => state.auth.user);  

  const [updatedUser, setUpdatedUser] = useState({
    biographie: user?.biographie ?? '',
    nom: user?.nom ?? '',
    prenom: user?.prenom ?? '',
    mail: user?.mail ?? '',
    tel: user?.tel ?? '',
    isHote: user?.isHote ?? false, 
  });

  const [errors, setErrors] = useState({
    nom: '',
    prenom: '',
    mail: '',
    tel: '',
  });

  const validateFields = () => {
    let isValid = true;
    const newErrors = { nom: '', prenom: '', mail: '', tel: '' };

    if (!updatedUser.nom || updatedUser.nom.trim() === '') {
      newErrors.nom = 'Le nom est obligatoire.';
      isValid = false;
    }

    if (!updatedUser.prenom || updatedUser.prenom.trim() === '') {
      newErrors.prenom = 'Le prénom est obligatoire.';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(updatedUser.mail)) {
      newErrors.mail = 'Veuillez entrer une adresse mail valide.';
      isValid = false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(updatedUser.tel)) {
      newErrors.tel = 'Veuillez entrer un numéro de téléphone valide (10 chiffres).';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleUpdate = async () => {
    if (validateFields()) {
      try {
        await axios.put(`${API_BASE_URL}/user/${user.idUser}`, updatedUser);
        const response = await axios.get(`${API_BASE_URL}/user/${user.idUser}`);
        const userData = response.data;
        navigation.navigate('Profil', { userData });
      } catch (error) {
        console.error('Erreur lors de la mise à jour du profil :', error);
      }
    }
  };

  const toggleIsHote = () => {
    setUpdatedUser((prevState) => ({
      ...prevState,
      isHote: !prevState.isHote, 
    }));
  };

  const deleteProfile = async () => {
    Alert.alert(
      "Suppression du compte",
      "Êtes-vous sûr ? Votre compte sera définitivement supprimé.",
      [
        {
          text: "Non",
          onPress: () => console.log("Annulation"),
          style: "cancel"
        },
        { 
          text: "Oui", onPress: async () => {
            try {
              await axios.delete(`${API_BASE_URL}/user/${user.idUser}`);
              navigation.navigate('Login');
            }
            catch (error) {
              console.error('Erreur lors de la suppression du profil :', error);
            }
          } 
        }
      ]
    );
  };

  return (
      <ScrollView>
        <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
                <Text style={styles.cancelText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteProfile}> 
                <Text style={styles.deleteProfileText}>Supprimer</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.headerContainer}>
            <Image source={require('../../assets/profil.png')} style={styles.avatar} />
            <View style={styles.modifcontainer}>
                <Text style={styles.inputLabel}>Nom</Text>
                <TextInput
                    style={styles.input}
                    value={updatedUser.nom}
                    onChangeText={(text) => setUpdatedUser({ ...updatedUser, nom: text })}
                    placeholder="Nom"
                />
                {errors.nom ? <Text style={styles.errorText}>{errors.nom}</Text> : null}

                <Text style={styles.inputLabel}>Prénom</Text>
                <TextInput
                    style={styles.input}
                    value={updatedUser.prenom}
                    onChangeText={(text) => setUpdatedUser({ ...updatedUser, prenom: text })}
                    placeholder="Prénom"
                />
                {errors.prenom ? <Text style={styles.errorText}>{errors.prenom}</Text> : null}

                <Text style={styles.inputLabel}>Biographie</Text>
                <TextInput
                    style={styles.input}
                    value={updatedUser.biographie}
                    onChangeText={(text) => setUpdatedUser({ ...updatedUser, biographie: text })}
                    placeholder="Biographie"
                />

                <Text style={styles.inputLabel}>Numéro de téléphone</Text>
                <TextInput
                    style={styles.input}
                    value={updatedUser.tel}
                    onChangeText={(text) => setUpdatedUser({ ...updatedUser, tel: text })}
                    placeholder="Numéro de téléphone"
                    keyboardType="numeric"
                />
                {errors.tel ? <Text style={styles.errorText}>{errors.tel}</Text> : null}

                <Text style={styles.inputLabel}>Adresse mail</Text>
                <TextInput
                    style={styles.input}
                    value={updatedUser.mail}
                    onChangeText={(text) => setUpdatedUser({ ...updatedUser, mail: text })}
                    placeholder="Adresse mail"
                    keyboardType="email-address"
                />
                {errors.mail ? <Text style={styles.errorText}>{errors.mail}</Text> : null}

                <View style={styles.checkboxContainer}>
                    <Checkbox
                        isChecked={updatedUser.isHote} 
                        onPress={toggleIsHote}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.checkboxLabel}>Êtes-vous hôte ?</Text>
                        <Text style={styles.italicText}>Vos lieux ne seront pas perdus dans le cas où vous changeriez d’avis</Text>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleUpdate} style={styles.button}>
                        <Text style={styles.buttonText}>Valider</Text>
                        <FontAwesome name="send" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    headerContainer: {
      alignItems: 'center',
      padding: 20,
      paddingTop: '29%',
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      position: 'absolute', 
      top: '15%', 
      alignSelf: 'center', 
      zIndex: 1, 
    },
    modifcontainer: {
      flex: 1,  
      width: '112%', 
      backgroundColor: '#E4F4FF',
      borderRadius: 20,
      padding: 40,
      paddingTop: 60,
      marginTop: 50,
      minHeight: '100%'
    },
    input: {
      height: 40,
      backgroundColor: 'white', 
      borderRadius: 15,
      marginBottom: 10,
      paddingHorizontal: 10,
      borderWidth: 0, 
    },
    inputGroup: {
      marginBottom: 15, 
    },
    inputLabel: {
      fontWeight: 'bold',
      marginBottom: 5, 
    },
    buttonContainer: {
      alignItems: 'center', 
      marginTop: 10, 
    },
    button: {
      flexDirection: 'row', 
      justifyContent: 'center', 
      backgroundColor: '#F78E3B', 
      borderRadius: 10,
      padding: 10,
      width: '60%', 
    },
    buttonText: {
      color: 'white', 
      marginRight: 5,
      fontSize: 17,
      fontWeight: 'bold' 
    },
    backButtonContainer: {
      marginLeft: "4%",
      marginTop: "8%",
    },
    deleteProfileText: {
      color: '#F78E3B',
      fontWeight: 'bold',
      fontSize: 16,
      marginTop: "25%",
    },
    cancelText: {
      color: '#173054',
      fontWeight: 'bold',
      fontSize: 16,
    },
    topBar: {
      position: 'absolute',
      left: 20,
      right: 20, 
      flexDirection: 'row',
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginTop: '10%',
      zIndex: 1
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start', 
      marginBottom: 20,
    },
    textContainer: {
      marginLeft: 10,  
    },
    checkboxLabel: {
      marginTop: 2,
      marginBottom: 2, 
    },
    italicText: {
      fontStyle: 'italic',
    },
    errorText: {
      color: 'red',
      fontSize: 12,
      marginBottom: 10,
    },
  });  

export default ProfilEdit;
