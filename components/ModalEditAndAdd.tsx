/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import ADIcon from 'react-native-vector-icons/AntDesign';
import {CatsType} from '../CatsDummyData';

interface ModalProps {
  modalEditVisible: boolean;
  setModalEditVisible: React.Dispatch<React.SetStateAction<boolean>>;
  catsData: CatsType[];
  setCatsData: React.Dispatch<React.SetStateAction<CatsType[]>>;
  currentCat: CatsType | null;
  setCurrentCat: React.Dispatch<React.SetStateAction<CatsType | null>>;
}

const ModalEditAndAdd: React.FC<ModalProps> = ({
  modalEditVisible,
  setModalEditVisible,
  catsData,
  setCatsData,
  currentCat,
  setCurrentCat,
}) => {
  const emptyInit = {
    id: new Date().getTime(),
    name: '',
    breed: '',
    description: '',
  };
  const initObjValue = currentCat ? currentCat : emptyInit;
  const [fields, setFields] = useState<CatsType>(initObjValue);

  useEffect(() => {
    setFields(initObjValue);
  }, [currentCat]);

  const onChange = () => {
    setCatsData((prev: any) => {
      let newArray = [];
      if (currentCat) {
        newArray = [...prev].map(item => {
          if (item.id === currentCat?.id) {
            return fields;
          }
          return item;
        });
      } else {
        newArray = [...prev];
        newArray.unshift(fields);
      }

      return newArray;
    });
    setModalEditVisible(!modalEditVisible);
    setCurrentCat(null);
    setFields(emptyInit);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalEditVisible}
      onRequestClose={() => {
        setModalEditVisible(!modalEditVisible);
      }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}>
        <View style={styles.modalCon}>
          <ScrollView style={styles.flex}>
            <View style={styles.modalBody}>
              <Text>Edit Cat</Text>
              <View style={styles.inputsCon}>
                <InputField
                  FieldName="name"
                  fields={fields}
                  setFields={setFields}
                />
                <InputField
                  FieldName="breed"
                  fields={fields}
                  setFields={setFields}
                />
                <InputField
                  FieldName="description"
                  fields={fields}
                  setFields={setFields}
                />
              </View>

              <View style={styles.btnnsCon}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => setModalEditVisible(!modalEditVisible)}>
                  <ADIcon name="closecircleo" size={30} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={onChange}>
                  <ADIcon name="check" size={30} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
interface InputField {
  FieldName: keyof CatsType;
  fields: CatsType;
  setFields: React.Dispatch<React.SetStateAction<CatsType>>;
}

const InputField = ({FieldName, fields, setFields}: InputField) => {
  return (
    <View style={styles.inputCon}>
      <Text style={styles.lableCat}>{FieldName}</Text>
      <TextInput
        style={styles.input}
        onChangeText={newVale => {
          setFields(prev => {
            return {...prev, [FieldName]: newVale};
          });
        }}
        value={String(fields[FieldName])}
        placeholder="useless placeholder"
      />
    </View>
  );
};

export default ModalEditAndAdd;

const styles = StyleSheet.create({
  flex: {flex: 1},
  modalCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 22,
    backgroundColor: '#17171797',
  },
  modalBody: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btnnsCon: {
    flexDirection: 'row',
    gap: 30,
  },
  btn: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  inputsCon: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
  },
  inputCon: {
    padding: 5,
    gap: 10,
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 5,
    width: '100%',
  },
  lableCat: {
    textTransform: 'capitalize',
  },
});
