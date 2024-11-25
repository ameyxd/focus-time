# Focus App

A minimalist Pomodoro timer and focus app with integrated YouTube music player and dynamic background effects.

## Features

### Core Features
-  Minimalist Pomodoro timer (25-minute focus sessions)
-  Integrated YouTube music player with lofi playlist
-  Dark/Light theme toggle
-  Dynamic background effects based on current playing video
-  Responsive design with minimized state
-  Real-time clock and location display
-  Week number and date display
    
### Recent Updates
- Added minimized state with compact timer display
- Improved blur effects and transitions
- Fixed video background loading issues
- Added next random track functionality
- Improved marquee animation for song titles
- Enhanced mobile responsiveness

## Planned Features

### Free Tier
- [ ] Custom timer durations
- [ ] Multiple timer types (Pomodoro, Short Break, Long Break)
- [ ] Sound notifications when timer ends
- [ ] Local storage for settings persistence
- [ ] Custom YouTube playlist support
- [ ] Keyboard shortcuts
- [ ] Progress statistics
- [ ] Task list integration
- [ ] Browser notifications
- [ ] PWA support for offline use

### Premium Features (🔒)
- [ ] Cloud sync across devices
- [ ] Custom themes and backgrounds
- [ ] Advanced statistics and insights
- [ ] Focus score and streaks
- [ ] Integration with productivity apps
- [ ] Multiple playlist support
- [ ] Custom sound effects
- [ ] Priority support
- [ ] Ad-free experience
- [ ] Team/Group focus sessions

## Known Issues
1. Video background occasionally shows default thumbnail on random track change
2. Marquee animation needs optimization for very long titles
3. Timer state persistence needed across page refreshes

## Development Roadmap

### Phase 1: Core Enhancement
- [ ] Add timer customization
- [ ] Implement sound notifications
- [ ] Add local storage support
- [ ] Improve mobile experience

### Phase 2: Social Features
- [ ] User accounts
- [ ] Focus groups
- [ ] Shared playlists
- [ ] Social statistics

### Phase 3: Premium Features
- [ ] Subscription system
- [ ] Advanced analytics
- [ ] Custom themes
- [ ] API integrations

## Monetization Ideas
1. **Premium Subscriptions**
   - Individual: $5/month
   - Team: $12/month (up to 5 users)
   - Enterprise: Custom pricing

2. **One-Time Purchases**
   - Custom theme packs
   - Sound effect bundles
   - Premium playlist curations

3. **Team/Enterprise Features**
   - Team focus sessions
   - Analytics dashboard
   - Admin controls
   - Custom branding

## Technical Debt
1. Need to implement proper state management (Redux/Zustand)
2. Optimize YouTube API calls
3. Add proper error boundaries
4. Implement comprehensive testing
5. Add proper loading states

## Contributing
Currently, this is a personal project. However, if you'd like to contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/NewFeature`)
3. Commit your changes (`git commit -m 'Add some NewFeature'`)
4. Push to the branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgments
- Next.js 13 App Router
- Tailwind CSS
- Shadcn/ui
- YouTube IFrame Player API
- Lucide Icons

## Contact
Amey Ambade - [@ameyxd](https://github.com/ameyxd)

Project Link: [https://github.com/ameyxd/focus-app](https://github.com/ameyxd/focus-app)




This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
