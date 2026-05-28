# pyrefly: ignore [missing-import]
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Any
from collections import defaultdict, deque

app = FastAPI()

# Allow the React dev server (any localhost origin) to call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class PipelinePayload(BaseModel):
    nodes: List[Any]
    edges: List[Any]


def is_dag(nodes: List[Any], edges: List[Any]) -> bool:
    """Return True if the graph formed by nodes/edges is a Directed Acyclic Graph.

    Uses Kahn's algorithm (BFS-based topological sort). If every node is
    processed the graph is acyclic; leftover nodes indicate a cycle.
    """
    node_ids = {n["id"] for n in nodes}

    # Build adjacency list and in-degree map from edges
    in_degree = {nid: 0 for nid in node_ids}
    adj = defaultdict(list)

    for edge in edges:
        src = edge.get("source") or edge.get("sourceHandle", "").split("-")[0]
        tgt = edge.get("target") or edge.get("targetHandle", "").split("-")[0]
        # Only count edges whose endpoints are known nodes
        if src in node_ids and tgt in node_ids:
            adj[src].append(tgt)
            in_degree[tgt] += 1

    # Kahn's BFS
    queue = deque(nid for nid, deg in in_degree.items() if deg == 0)
    visited = 0

    while queue:
        node = queue.popleft()
        visited += 1
        for neighbour in adj[node]:
            in_degree[neighbour] -= 1
            if in_degree[neighbour] == 0:
                queue.append(neighbour)

    return visited == len(node_ids)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(payload: PipelinePayload):
    num_nodes = len(payload.nodes)
    num_edges = len(payload.edges)
    dag = is_dag(payload.nodes, payload.edges)
    return {'num_nodes': num_nodes, 'num_edges': num_edges, 'is_dag': dag}

