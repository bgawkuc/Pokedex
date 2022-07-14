import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  img: {
    width: 150,
    height: 150,
  },
  imgContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    left: '5%',
    height: 350,
    backgroundColor: '#dececa',
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 20,
  },
  emptyCard: {
    height: 100,
  },
  name: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    textTransform: 'capitalize',
    marginTop: 30,
  },
  info: {
    display: 'flex',
    marginTop: -20,
  },
  infoRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  infoElement: {
    fontSize: 20,
  },
  favBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
