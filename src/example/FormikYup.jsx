import {Alert, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import { Button, Input, Toggle } from '@ui-kitten/components';
import * as Yup from 'yup';



const FormikYup = () => {
  const registerSchema = Yup.object().shape({
    
    name: Yup.string()
      .min(2, 'Adınız en az 2 karakterden oluşmalıdır')
      .required('Ad alanı zorunludur'),

    surname: Yup.string()
      .min(2, 'Soyadınız en az iki karekter içermelidir')
      .required('Soyad alanı zorunludur'),

      email: Yup.string()
      .email('Geçerli bir e-posta adresi girin')
      .required('E-posta alanı zorunludur'),


      phone: Yup.string()
      .min(11, 'Lütfen minimum 11 hane olarak giriniz!!! ')
      .max(13,'Lütfen maximum 13 hane olarak giriniz!!!')
      .required('Telefon numarası alanı zorunludur'),
     
      password:Yup.string().required('Şifre alanı zorunludur').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,50}$/,'Şartlar sağlanmıyor!!!'),
      passwordConfirm:Yup.string().required('Şifre alanı zorunludur')
      .oneOf([Yup.ref('password'), null], 'Şifreler eşleşmiyor'),

      agrementConfirm: Yup.bool().required('Zorunlu Alan').oneOf([true],'Sözleşmeyi onaylamanız gerekiyor.'),

  });

  return (
    <View style={styles.container}>
      {/*  // BAŞLIK ALANI */}
      <View
        style={{
          padding: 20,
          backgroundColor: '#54E096',
          minHeight: 125,
          justifyContent: 'flex-end', // dikeyde hizalar y ekseni
          alignItems: 'center', // yatay da ortalar x ekseni
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
          KAYIT OLUŞTUR
        </Text>
      </View>

      {/* // KAYIT FORMU */}
      <View style={{flex: 1, padding: 10}}>
        <ScrollView>
          <Formik
            initialValues={{
              email: '',
              name: '',
              surname: '',
              phone: '',
              password: '',
              passwordConfirm: '',
              agrementConfirm: false,
            }}
            validationSchema={registerSchema}
            onSubmit={values => Alert.alert('Form Değerleri', JSON.stringify(values, null, 2))}>
            {({handleChange, handleSubmit, values, setFieldValue, errors}) => (
              <View>
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.name}
                  label={'İsim'}
                  placeholder="İsim bilgisi giriniz.."
                  onChangeText={handleChange('name')} // 25. satırda yer alan email prop u neyse aynısını  verdik
                  status={errors.surname ? 'danger' : 'basic'}
                  caption={errors.name}
                />

                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.surname}
                  label={'Soyad'}
                  placeholder="Soyad bilgisi giriniz.."
                  onChangeText={handleChange('surname')} // 25. satırda yer alan email prop u neyse aynısını  verdik
                  status={errors.name ? 'danger' : 'basic'}
                  caption={errors.surname}
                />

                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.email}
                  label={'E-mail'}
                  placeholder="E-mail bilgisi giriniz.."
                  onChangeText={handleChange('email')} // 25. satırda yer alan email prop u neyse aynısını  verdik
                  status={errors.email ? 'danger' : 'basic'}
                  caption={errors.email}
                />

                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.phone}
                  label={'Telefon'}
                  placeholder="Telefon bilgisi giriniz.."
                  onChangeText={handleChange('phone')} // 25. satırda yer alan email prop u neyse aynısını  verdik
                  status={errors.phone ? 'danger' : 'basic'}
                  caption={errors.phone}
                />

                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.password}
                  label={'Şifre'}
                  placeholder="Şifre giriniz.."
                  onChangeText={handleChange('password')} // 25. satırda yer alan email prop u neyse aynısını  verdik
                  status={errors.password ? 'danger' : 'basic'}
                  caption={errors.password}
                  secureTextEntry={true}
                />

                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.passwordConfirm}
                  label={'Şifre Tekrarı'}
                  placeholder="Şifreyi tekrar giriniz.."
                  onChangeText={handleChange('passwordConfirm')} // 25. satırda yer alan email prop u neyse aynısını  verdik
                  status={errors.passwordConfirm ? 'danger' : 'basic'}
                  caption={errors.passwordConfirm}
                  secureTextEntry={true}
                
                />

             <View >
             <Toggle
            
              checked={values.agrementConfirm}
              onChange={value=>setFieldValue('agrementConfirm', 
              value)}>
              Kullanıcı  Sözleşmesini  ve  Gizlilik Anlaşmasını Kabul Ediyorum.
             </Toggle>
             {errors.agrementConfirm && (
              <Text style={{color:'red'}}>{errors.agrementConfirm} </Text>
             )}
             </View>


                <Button
                  style={{marginTop: 30}}
                  onPress={handleSubmit}
                  status="success">
                  KAYDET
                </Button>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </View>
  );
};

export default FormikYup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
