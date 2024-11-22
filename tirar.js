return (
    <ImageBackground source={require('../../../assets/introLoginBackgroundTrans.jpg')} style={styles.container}>
        <Image style={styles.image} source={require('../../../assets/login.png')} />
        
        <KeyboardAvoidingView behavior='padding'>
            <TextInput value={email} style={styles.input} placeholder='Email' autoCapitalize='none'
                onChangeText={(text) => setEmail(text)}></TextInput>
            <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder='password' autoCapitalize='none'
                onChangeText={(text) => setPassword(text)}></TextInput>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <Pressable style={styles.button} onPress={signIn}>
                        <Text style={styles.text}>Login</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={signUp}>
                        <Text style={styles.text}>Create Account</Text>
                    </Pressable>
                </>
            )}
        </KeyboardAvoidingView>
    </ImageBackground>
);
