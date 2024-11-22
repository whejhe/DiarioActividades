// src/screens/Login.js
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    Pressable,
} from "react-native";
import { FIREBASE_AUTH } from "../services/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const navigation = useNavigation();

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate("Home");
        } catch (error) {
            console.log(error);
            alert("Sign in failed: " + error.message);
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={email}
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
            ></TextInput>
            <TextInput
                secureTextEntry={true}
                value={password}
                style={styles.input}
                placeholder="password"
                autoCapitalize="none"
                onChangeText={(text) => setPassword(text)}
            ></TextInput>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <Pressable style={styles.button} onPress={signIn}>
                        <Text style={styles.text}>Login</Text>
                    </Pressable>
                    <Pressable
                        style={styles.button}
                        onPress={() => navigation.navigate("Register")}
                    >
                        <Text style={styles.text}>Create Account</Text>
                    </Pressable>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: 300,
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
    },
    button: {
        padding: 10,
        backgroundColor: "#323446",
        borderRadius: 8,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: "#F0D262",
    },
    text: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
    },
});

export default Login;
