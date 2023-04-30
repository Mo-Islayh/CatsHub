/* eslint-disable react/react-in-jsx-scope */
import {View, TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';
import ADIcon from 'react-native-vector-icons/AntDesign';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {Cats, CatsType} from '../CatsDummyData';
import {useState} from 'react';
import ModalEditAndAdd from './ModalEditAndAdd';

const CatsHub = () => {
  const [modalEditVisible, setModalEditVisible] = useState(false);
  const [currentCat, setCurrentCat] = useState<CatsType | null>(null);
  const [catsData, setCatsData] = useState<CatsType[]>(Cats);

  const ModalProps = {
    modalEditVisible,
    setModalEditVisible,
    currentCat,
    setCurrentCat,
    catsData,
    setCatsData,
  };
  const onDeleteCat = (cat: CatsType) => {
    const deleteHandler = () => {
      setCatsData([...catsData].filter(item => item.id !== cat.id));
    };

    const catName = cat.name;

    Alert.alert(
      `Delete ${catName}`,
      `This action will Delete  ${catName}'s Details`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deleteHandler()},
      ],
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          setCurrentCat(null);
          setModalEditVisible(true);
        }}>
        <Text>Add Cat</Text>
        <ADIcon name="plus" size={30} color="#900" />
      </TouchableOpacity>
      <View style={styles.CatConntainer}>
        {catsData.map((cat, _id) => (
          <View key={_id} style={styles.CatItem}>
            <Text>{cat.name}</Text>
            <View style={styles.iconsCon}>
              <TouchableOpacity
                onPress={() => {
                  setCurrentCat(cat);
                  setModalEditVisible(true);
                }}>
                <MIcon name="edit" size={25} color="#51103e" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onDeleteCat(cat);
                }}>
                <MIcon name="delete" size={25} color="#51103e" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <ModalEditAndAdd {...ModalProps} />
    </View>
  );
};

export default CatsHub;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
    gap: 10,
  },
  addBtn: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  CatConntainer: {
    flex: 1,
    alignItems: 'stretch',
    gap: 10,
  },
  CatItem: {
    borderColor: 'gray',
    borderWidth: 2,
    width: '100%',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconsCon: {
    flexDirection: 'row',
    gap: 10,
  },
});
