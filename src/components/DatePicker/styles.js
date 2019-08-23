import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 20px 0 15px;
`;

export const DateButton = styled.TouchableOpacity`
  padding: 0 15px;
  height: 55px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin: 0 30px;
  flex-direction: row;
  align-items: center;
`;

export const DateText = styled.Text`
  font-size: 16px;
  color: #fff;
  margin-left: 15px;
`;

export const Picker = styled.View`
  background: #fff;
  padding: 15px 30px;
  margin-top: 30px;
`;
