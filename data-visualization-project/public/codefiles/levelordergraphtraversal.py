def level_order_traversal(graph, start):
    visited = set()
    queue = deque()

    # Enqueue the starting node
    queue.append(start)

    while queue:
        node = queue.popleft()

        # Visit the node if it's not already visited
        if node not in visited:
            visited.add(node)
            print(node)  

            # Enqueue the neighbors of the node
            neighbors = graph.get(node, [])
            for neighbor in neighbors:
                if neighbor not in visited:
                    queue.append(neighbor)
