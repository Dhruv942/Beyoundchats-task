import { MessageType } from './types';

export interface Chat {
  id: string;
  avatar: string;
  name: string;
  messages: Message[];
  lastSeen: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'customer';
  timestamp: string;
  type?: MessageType;
}

export const chats: Chat[] = [
  {
    id: '1',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
    name: 'Sarah Johnson',
    lastSeen: '10 minutes ago',
    messages: [
      {
        id: '1-1',
        text: 'Hi there, I need to request a refund for my recent purchase.',
        sender: 'customer',
        timestamp: '2023-09-21T10:24:00',
      },
      {
        id: '1-2',
        text: 'Hello Sarah, I\'d be happy to help with your refund request. Could you please provide your order number?',
        sender: 'user',
        timestamp: '2023-09-21T10:25:00',
      },
      {
        id: '1-3',
        text: 'Sure, it\'s ORD-4589-7652. I ordered the wireless headphones but they\'re not working as expected.',
        sender: 'customer',
        timestamp: '2023-09-21T10:27:00',
      },
      {
        id: '1-4',
        text: 'I understand. Could you explain what issues you\'re experiencing with the headphones?',
        sender: 'user',
        timestamp: '2023-09-21T10:29:00',
      },
      {
        id: '1-5',
        text: 'The battery drains within an hour despite the advertised 10-hour battery life. I\'ve fully charged them multiple times.',
        sender: 'customer',
        timestamp: '2023-09-21T10:31:00',
      }
    ],
  },
  {
    id: '2',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    name: 'Michael Thompson',
    lastSeen: '2 hours ago',
    messages: [
      {
        id: '2-1',
        text: 'I need to return a product I recently purchased.',
        sender: 'customer',
        timestamp: '2023-09-20T14:05:00',
      },
      {
        id: '2-2',
        text: 'Hello Michael, I\'d be happy to help with your return. Could you please share your order number?',
        sender: 'user',
        timestamp: '2023-09-20T14:07:00',
      },
      {
        id: '2-3',
        text: 'It\'s ORD-9872-3456. I bought a size L shirt but need to exchange it for XL.',
        sender: 'customer',
        timestamp: '2023-09-20T14:10:00',
      },
      {
        id: '2-4',
        text: 'Thank you for the information. I can see your order. Is the item in its original packaging?',
        sender: 'user',
        timestamp: '2023-09-20T14:12:00',
      },
      {
        id: '2-5',
        text: 'Yes, I haven\'t worn it. Just tried it on once and realized it doesn\'t fit properly.',
        sender: 'customer',
        timestamp: '2023-09-20T14:15:00',
      }
    ],
  },
  {
    id: '3',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    name: 'Emma Rodriguez',
    lastSeen: '1 day ago',
    messages: [
      {
        id: '3-1',
        text: 'I received a damaged product in my latest order.',
        sender: 'customer',
        timestamp: '2023-09-19T09:34:00',
      },
      {
        id: '3-2',
        text: 'I\'m sorry to hear that, Emma. Could you please provide your order number and describe the damage?',
        sender: 'user',
        timestamp: '2023-09-19T09:36:00',
      },
      {
        id: '3-3',
        text: 'The order number is ORD-7812-9034. I ordered a ceramic vase, but it arrived with a crack on the side.',
        sender: 'customer',
        timestamp: '2023-09-19T09:38:00',
      },
      {
        id: '3-4',
        text: 'I apologize for this experience. Would you be able to send some photos of the damage?',
        sender: 'user',
        timestamp: '2023-09-19T09:40:00',
      },
      {
        id: '3-5',
        text: 'Yes, I\'ll take some pictures right now and send them over. Should I expect a replacement or refund?',
        sender: 'customer',
        timestamp: '2023-09-19T09:43:00',
      }
    ],
  },
  {
    id: '4',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
    name: 'David Wilson',
    lastSeen: '3 days ago',
    messages: [
      {
        id: '4-1',
        text: 'Can I change my payment method to cash on delivery?',
        sender: 'customer',
        timestamp: '2023-09-17T16:20:00',
      },
      {
        id: '4-2',
        text: 'Hi David, I\'ll check if we can modify your payment method. Could you provide your order number?',
        sender: 'user',
        timestamp: '2023-09-17T16:22:00',
      },
      {
        id: '4-3',
        text: 'It\'s ORD-3459-8712. I placed the order about an hour ago with my credit card.',
        sender: 'customer',
        timestamp: '2023-09-17T16:25:00',
      },
      {
        id: '4-4',
        text: 'I can see your order. Since it hasn\'t been processed yet, we can change the payment method. There\'s a $5 fee for cash on delivery. Is that okay?',
        sender: 'user',
        timestamp: '2023-09-17T16:28:00',
      },
      {
        id: '4-5',
        text: 'Yes, that\'s fine. Please go ahead and make the change.',
        sender: 'customer',
        timestamp: '2023-09-17T16:30:00',
      }
    ],
  },
  {
    id: '5',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100',
    name: 'Jessica Martinez',
    lastSeen: '1 week ago',
    messages: [
      {
        id: '5-1',
        text: 'I need to cancel my order immediately.',
        sender: 'customer',
        timestamp: '2023-09-15T11:05:00',
      },
      {
        id: '5-2',
        text: 'Hello Jessica, I\'ll help you with cancelling your order. May I have your order number please?',
        sender: 'user',
        timestamp: '2023-09-15T11:07:00',
      },
      {
        id: '5-3',
        text: 'The order number is ORD-6721-5430. I just placed it about 30 minutes ago.',
        sender: 'customer',
        timestamp: '2023-09-15T11:09:00',
      },
      {
        id: '5-4',
        text: 'Thank you for providing that. I can see your order is still in the processing stage, so we can cancel it. May I ask the reason for cancellation?',
        sender: 'user',
        timestamp: '2023-09-15T11:12:00',
      },
      {
        id: '5-5',
        text: 'I accidentally ordered the wrong model. I\'ll place a new order with the correct item once this is cancelled.',
        sender: 'customer',
        timestamp: '2023-09-15T11:15:00',
      }
    ],
  },
];