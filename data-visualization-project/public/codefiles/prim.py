def prim_algorithm(graph):
    nodes = list(graph.keys())
    num_nodes = len(nodes)
    parent = {node: None for node in nodes}

    # Set to keep track of visited nodes
    visited_nodes = set()

    # Dictionary to store key values for each node
    key_values = {node: float('inf') for node in nodes}

    # Initialize key values for the starting node
    starting_node = nodes[0]
    key_values[starting_node] = 0

    # Main loop for the Prim's algorithm
    while len(visited_nodes) < num_nodes:
        current = None
        min_key_value = float('inf')

        # Find the node with the minimum key value among unvisited nodes
        for node in nodes:
            if node not in visited_nodes and key_values[node] < min_key_value:
                min_key_value = key_values[node]
                current = node

        # Break the loop if there are no more nodes to explore
        if current is None:
            break

        # Explore neighbors and find the edge with minimum weight
        neighbors = graph.get(current, [])
        for neighbor, weight in neighbors:
            if neighbor not in visited_nodes and weight < key_values[neighbor]:
                # Update key values and parent information
                key_values[neighbor] = weight
                parent[neighbor] = current

        # Mark the current node as visited
        visited_nodes.add(current)

    # Return the parent dictionary representing the minimum spanning tree
    return parent
