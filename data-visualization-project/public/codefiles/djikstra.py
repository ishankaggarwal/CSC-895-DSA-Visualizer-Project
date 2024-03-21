def dijkstra(graph, start):
    # The graph is represented as a dictionary of dictionaries,
    # where graph[u][v] is the distance from node u to node v.

    # Initialize distances from start to all nodes as infinity
    # and distance to start node itself as 0.
    distances = {node: float('infinity') for node in graph}
    distances[start] = 0

    # Priority queue to hold nodes and their current distances
    # for selection of the node with the smallest distance.
    priority_queue = [(0, start)]

    while priority_queue:
        # Select the node with the smallest distance.
        current_distance, current_node = heapq.heappop(priority_queue)

        if current_distance > distances[current_node]:
            continue  # Skip if we've found a better path

        # Explore neighbors of the current node.
        for neighbor, weight in graph[current_node].items():
            distance = current_distance + weight

            # Update the distance if a shorter path is found.
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(priority_queue, (distance, neighbor))

    return distances