

mod iter 
{
	pub mod iterador 
	{
		pub trait Iterador: std::iter::Iterator + std::clone::Clone 
		{
			fn pair(&self) -> std::option::Option<(Self::Item, Self)> 
			{
				let mut tail = self.clone();
				tail.next().map(|head| (head, tail))
			}
		}
		impl<T: std::iter::Iterator + std::clone::Clone> Iterador for T {}
		
		pub fn pair<I>(iter: &I) -> std::option::Option<(I::Item, I)> 
		where 
			I: Iterador, 
		{
			iter.pair()
		}
		
		pub fn iterate<T, F>(init: T, mut f: F) -> impl Iterador<Item = T> 
		where 
			F: std::ops::FnMut(T) -> T + std::clone::Clone, 
			T: std::clone::Clone, 
		{
			std::iter::successors(
				std::option::Option::Some(init.clone()), 
				move |x| std::option::Option::Some(f(x.clone())))
		}
		
		pub fn unfold<T, S, F>(init: S, mut f: F) -> impl Iterador<Item = T> 
		where 
			F: std::ops::FnMut(S) -> (T, S) + std::clone::Clone, 
			T: std::clone::Clone, S: std::clone::Clone, 
		{
			std::iter::successors(
					std::option::Option::Some(f(init.clone())), 
					move |&(_, ref s)| std::option::Option::Some(f(s.clone())))
				.map(|(value, _)| value)
		}
	}
}

fn main () 
{
	{
		let fib = iter::iterador::iterate(
				(0, 1), 
				|(a, b)| (b, a + b))
			.map(|(a, _)| a);
		
		if let Some((head, tail)) = iter::iterador::pair(&fib)
		{
			println!("2: head: {}", head); //> 2: head: 0
			println!("2: tail 13: {:?}", tail.take(13).collect::<Vec<_>>());
			//> 2: tail 13: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233]
			println!("2: fib 13: {:?}", fib.take(13).collect::<Vec<_>>());
			//> 2: fib 13: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]
		}
	}
	
	{
		let fib = iter::iterador::unfold((0, 1), |(a, b)| (a, (b, a + b)));
		
		use iter::iterador::Iterador;
		if let Some((head, tail)) = fib.pair() // <_ as iter::iterador::Iterador>::pair(&fib)
		{
			println!("3: head: {}", head); //> 3: head: 0
			println!("3: tail 13: {:?}", tail.take(13).collect::<Vec<_>>());
			//> 3: tail 13: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233]
			println!("3: fib 13: {:?}", fib.take(13).collect::<Vec<_>>());
			//> 3: fib 13: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]
		}
	}
}