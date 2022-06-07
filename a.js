/******************************************************************************

                              Online C++ Compiler.
               Code, Compile, Run and Debug C++ program online.
Write your code in this editor and press "Run" button to compile and execute it.

*******************************************************************************/

#include <iostream>

using namespace std;


int minimax(Node* node, int depth, bool maximizingPlayer){
    if(node->next == NULL && depth==0){
        return node->value;
    }
    if(maximizingPlayer){
        int Mx=-999999999;
        for(int i=0; i < sizeof(node->next); i++){
            Mx = max(Mx, minimax(node->next[i], depth-1, False));
        }
        return Mx;
    }else{
        Mn = 999999999;
        for(int i=0; i < sizeof(node->next); i++){
            Mn = min(Mn, minimax(minimax(node->next[i], depth-1, True));
        }
        return Mn;
    }
}

int alphabeta(Node* node, int depth, int a, int b, bool maximizingPlayer){
    if(node->next == NULL && depth==0){
        return node->value;
    }
    if(maximizingPlayer){
        for(int i=0; i < sizeof(node->next); i++){
            a = max(a, minimax(node->next[i], depth-1, a, b False));
            if(a>=b){
                break;
            }
        }
        return a;
    }else{
        for(int i=0; i < sizeof(node->next); i++){
            b = min(b, minimax(minimax(node->next[i], depth-1, a, b, True));
        }
        if(a >= b){
            break;
        }
        return b;
    }
}

int main()
{
    cout<<"Hello World";

    return 0;
}

