# cs361 Travel Information Search

The website is to provide a quick travel information for the traveler.

# The three basic travel search

There are three microservice that are similar and independent from each other: weather, currency, and geo-location. For the weather and geo-location, the user provides the city name. Then the user can get the weather information such as temperature and pattern from the weather service, or the geo coordinates (longitudes and latitudes) in the geo-location service. For the currency service, the user provides the country name then get the currency exchange rate of that country to the US dollars.

# Request Data
To request the data from the service using python, the client-side (Client) can import zmq library and establish the zmq.Context() to create a socket connection with the port number. The port number are as the following:

Weather	tcp://localhost:5555
Currency	tcp://localhost:5556
Location	tcp://localhost:5557
 
Once connection is established, the user can start their inputs as described above. For the user input, I used the terminal to ask for user to provide their inputs. Then socket.send will send the input to the service side.
Once the service side received the input, it will send back to the Client what it received and the searched answer. The Client will use socket.recv to receive the answer and display it in the terminal.

The barebone code for Client is shown below.

    import zmq

    context = zmq.Context()

    #  Socket to talk to server
    print("Connecting to service…")
    socket = context.socket(zmq.REQ)
    socket.connect("tcp://localhost:5555")

    #  Do equests, waitingfor a response
    cityName = input("Enter your city name for weather: ")
    print(f"Sending request …")
    socket.send(bytes(cityName, encoding='utf-8'))

    #  Get the reply.
    message = socket.recv()
    print(f"Received search results: {message.decode()}")


# Receive Data
Ther Service will receive the data from the client-side. Similar to Client, it initialize the zmq.Context with the zmq library. And socket connection is established after the Client ping it and the Service then use socket.bind to establish the connection. The port numbers are the same as mentioned. The biggest difference is the Service will be always listening for the Client’s ping and will do so in a loop. In each loop, it will receive Client’s request using socket.recv() and print the requesting message. Then take a one-second pause, then send back the results to the Client.

The barebone codes are shown below for the Weather service.

    import time
    import zmq

    context = zmq.Context()
    socket = context.socket(zmq.REP)
    socket.bind("tcp://*:5555")

    while True:
        #  Wait for next request from client
        message = socket.recv()
        print(f"Received your request: {message.decode()}")

        #  Do some 'work'
        time.sleep(1)

        #  Send reply back to client
        socket.send(bytes("(Mock-up Answer)", encoding='utf-8'))

 
# The Unified Modeling Language (UML) Sequence Diagrams are shown below:
Since the services are independent of each other, their UML Sequence Diagrams are independent as well.

 

![image](https://user-images.githubusercontent.com/69396051/180930776-93d96238-5352-4406-84ea-06ad1ebab8cc.png)

![image](https://user-images.githubusercontent.com/69396051/180930795-1fe9ae5f-945c-4211-ab30-4aa58cae3dc9.png)

![image](https://user-images.githubusercontent.com/69396051/180930809-62964e97-2380-4126-97c5-4f9d6d1d10f0.png)


 

 
