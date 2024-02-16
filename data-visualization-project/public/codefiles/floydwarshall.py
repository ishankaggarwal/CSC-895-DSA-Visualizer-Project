def floyd_warshall(graph):
    # Number of vertices in the graph
    n = len(graph)

    # Initialize the distance matrix with the input graph
    distance_matrix = [[float('inf')] * n for _ in range(n)]

    for i in range(n):
        distance_matrix[i][i] = 0  # Distance from a vertex to itself is 0
        for j, weight in graph[i]:
            distance_matrix[i][j] = weight

    # Floyd-Warshall algorithm
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if distance_matrix[i][k] + distance_matrix[k][j] < distance_matrix[i][j]:
                    distance_matrix[i][j] = distance_matrix[i][k] + distance_matrix[k][j]

    return distance_matrix