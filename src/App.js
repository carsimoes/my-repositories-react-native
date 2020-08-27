import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ListItem
} from "react-native";

import api from './services/api';

export default function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(
        response =>{
            //console.log(response.data);
            setRepositories(response.data);   
        });
  },[]);

  async function handleLikeRepository(id) {
    
     const response = await api.post('repositories/'+id+'/like'); //no meu server está como put
     const indexId = repositories.findIndex(item => item.id === id)
    
     const repositoriesAux = repositories.map(item => item)
  
   repositoriesAux[indexId].likes += 1;
  //repositoriesAux.likes = response.likes;
     setRepositories(repositoriesAux)
      // setRepositories(repositories.map(repository => {
      //   if (repository.id === id) {
      //     return response.data;
      //   } else {
      //     return repository;
      //   }
      // }));
  }
 
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>

        <FlatList  
          data={repositories}
          keyExtractor={repository => repository.id}
          renderItem={({item:repository}) => (
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{repository.title}</Text>

                {/* <FlatList
                  style={styles.techsContainer}
                  data={repository.techs}
                  keyExtractor={rt => rt}
                  renderItem={({item:tech}) => (
                    <View style={styles.techsContainer}>
                      <Text style={styles.tech}>
                        {tech}
                      </Text>      
                    </View>
                  )}>
                </FlatList> */}
        
              <View style={styles.techsContainer}>
                {repository.techs.map(tech=>(
                   <Text key={tech} style={styles.tech}>
                   {tech}
                 </Text>   
                ))}
              </View>

              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  testID={`repository-likes-${repository.id}`}
                > 
                {repository.likes} curtidas
                          
                </Text>
              </View>
             
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repository.id)}
                testID={`like-button-${repository.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )}>

        </FlatList>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
