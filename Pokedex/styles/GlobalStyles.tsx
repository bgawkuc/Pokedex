import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  // image
  img: {
    width: 150,
    height: 150,
  },
  imgContainer: {
    display: 'flex',
    alignItems: 'center',
    zIndex: 10,
  },

  // card
  card: {
    width: '90%',
    left: '5%',
    height: 426,
    backgroundColor: '#dececa',
    marginTop: 20,
    borderRadius: 12,
  },
  cardDetails: {
    marginTop: -70,
    paddingTop: 70,
    height: 280,
    backgroundColor: 'white',
    width: '90%',
    marginLeft: '5%',
    borderRadius: 8,
  },
  cardElement: {
    marginBottom: 16,
  },
  emptyCard: {
    height: 100,
  },

  //pokemon name
  name: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    textTransform: 'capitalize',
    marginTop: 30,
  },
  // pokemon type
  type: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  typeNameBackground: {
    backgroundColor: '#dececa',
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8,
    marginLeft: 8,
    borderRadius: 8,
  },
  typeName: {
    textTransform: 'capitalize',
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
  // pokemon title section about
  about: {
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 20,
    color: '#dececa',
  },

  // pokemon about information
  info: {
    // display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  infoCol: {
    display: 'flex',
    alignItems: 'center',
    width: '33.33%',
  },
  infoRow: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 10,
  },
  infoRowValue: {
    fontSize: 20,
    marginLeft: 10,
  },

  // heart button
  favBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
