{
	fn iter_pair<I>(iter: &I) -> std::option::Option<(I::Item, I)> 
	where 
		I: std::iter::Iterator + std::clone::Clone, 
	{
		let mut iter_clone = iter.clone();
		iter_clone.next().map(|head| (head, iter_clone))
	}
	
	trait Iterador: std::iter::Iterator + std::clone::Clone 
	{
		fn pair(&self) -> std::option::Option<(Self::Item, Self)> 
		{
			iter_pair(self)
		}
	}
	impl<T: std::iter::Iterator + std::clone::Clone> Iterador for T {}
	
	fn iterador_iterate<T, F>(init: T, mut f: F) -> impl Iterador<Item = T> 
	where 
		F: std::ops::FnMut(T) -> T + std::clone::Clone, 
		T: std::clone::Clone, 
	{
		std::iter::successors(
			std::option::Some(init.clone()), 
			move |x| std::option::Some(f(x.clone())))
	}
	
	fn iterador_unfold<T, S, F>(init: S, mut f: F) -> impl Iterador<Item = T> 
	where 
		F: std::ops::FnMut(S) -> (T, S) + std::clone::Clone, 
		T: std::clone::Clone, S: std::clone::Clone, 
	{
		std::iter::successors(
				std::option::Some(f(init.clone())), 
				move |&(_, ref s)| std::option::Some(f(s.clone())))
			.map(|(value, _)| value)
	}
	
	//////////////////
	
	{
		let fib = iter_iterate(
				(0, 1), 
				|(a, b)| (b, a + b))
			.map(|(a, _)| a);
		if let Some((head, tail)) = fib.pair()
		{
			println!("2: head: {}", head); //> 2: head: 0
			println!("2: tail 13: {:?}", tail.take(13).collect::<Vec<_>>());
			//> 2: tail 13: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233]
			println!("2: fib 13: {:?}", fib.take(13).collect::<Vec<_>>());
			//> 2: fib 13: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]
		}
	}
	
	{
		let fib = iter_unfold((0, 1), |(a, b)| (a, (b, a + b)));
		if let Some((head, tail)) = fib.pair()
		{
			println!("3: head: {}", head); //> 3: head: 0
			println!("3: tail 13: {:?}", tail.take(13).collect::<Vec<_>>());
			//> 3: tail 13: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233]
			println!("3: fib 13: {:?}", fib.take(13).collect::<Vec<_>>());
			//> 3: fib 13: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]
		}
	}
}